var express = require("express");
var app = express();
var path = require("path");
const mysql = require('mysql');
const bodyParser = require('body-parser'); 
const { error } = require("console");
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join("../../SONWEB")));
app.use(express.static('public'));
app.use(express.json());



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'proje_6'
});


db.connect((err) => {
    if (err) {
        console.error('MySQL bağlantı hatası: ' + err.stack);
        return;
    }
    console.log('MySQL bağlandı, bağlantı ID: ' + db.threadId);

    
    app.listen(port, function () {
        console.log("Sunucu localhost:" + port + " adresinde çalışıyor...");
    });
});
//-----------------------------------------------------------------------------------------------


app.get('/gunlukciro/:year', (req, res) => {
  const year = req.params.year;

  const query = `
    SELECT 
      YEAR(tarih) AS yil,
      MONTHNAME(tarih) AS ay,
      ROUND(AVG(paket_ciro + restoran_ciro), 2) AS ortalama_ciro
    FROM 
      gunluk_ciro
    WHERE 
      YEAR(tarih) = ?
    GROUP BY 
      yil, MONTH(tarih)
    ORDER BY 
      yil, MONTH(tarih);
  `;

  db.query(query, [year], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    res.json(results);
  });
});
  

app.get('/ciro', (req, res) => {
    const tarih1 = req.query.tarih1; 
    const tarih2 = req.query.tarih2;
  
    const query = `SELECT SUM(gunluk_ciro.paket_ciro + gunluk_ciro.restoran_ciro) as toplam_ciro
                   FROM gunluk_ciro
                   WHERE gunluk_ciro.tarih BETWEEN ? AND ?`;
  
    
    db.query(query, [tarih1, tarih2], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        throw error;
      }
  
      res.json({ toplam_ciro: results[0].toplam_ciro });
    });
  });


  app.get('/iki-tarih-toplam-fis', (req, res) => {
    const tarih1 = req.query.tarih1;
const tarih2 = req.query.tarih2;


if (!tarih1 || !tarih2) {
  return res.status(400).json({ error: 'Tarih değerleri eksik veya geçersiz.' });
}
    const query = `SELECT SUM(gunluk_fis.fis_paket+gunluk_fis.fis_restoran)
    FROM gunluk_fis
    WHERE gunluk_fis.tarih BETWEEN ? AND ?`;
  
    
    db.query(query, [tarih1, tarih2], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
        throw error;
      }
    
       
    
      if (results && results.length > 0 && results[0]['SUM(gunluk_fis.fis_paket+gunluk_fis.fis_restoran)']) {
        res.json({ toplam_fis: results[0]['SUM(gunluk_fis.fis_paket+gunluk_fis.fis_restoran)'] });
      } else {
        res.json({ toplam_fis: 0 }); 
      }
    });
  })

app.get('/iki-tarih-ciro', (req, res) => {
  const tarih1 = req.query.tarih1; 
  const tarih2 = req.query.tarih2;

  const query = `SELECT gunluk_ciro.paket_ciro as paket, gunluk_ciro.restoran_ciro as restoran, gunluk_ciro.tarih
                 FROM gunluk_ciro
                 WHERE gunluk_ciro.tarih BETWEEN ? AND ?`;

  
  db.query(query, [tarih1, tarih2], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
      throw error;
    }

    res.json(results); 
  });
});

app.get('/iki-tarih-fis', (req, res) => {
  const tarih1 = req.query.tarih1;
  const tarih2 = req.query.tarih2;

  const query = `SELECT gunluk_fis.fis_paket as paket,gunluk_fis.fis_restoran as restoran,gunluk_fis.tarih
  FROM gunluk_fis
  WHERE gunluk_fis.tarih BETWEEN ? AND ?`;

  
  db.query(query, [tarih1, tarih2], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Veritabanı hatası: ' + error.message });
      throw error;
    }

    res.json(results); 
  });
});


app.post('/veri_ekle_iki_tablo', (req, res) => {
  const { tarih, restoran_id, restoran_ciro, paket_ciro, fis_paket, fis_restoran } = req.body;

  
  if (!tarih || !restoran_id || !restoran_ciro || !paket_ciro || !fis_paket || !fis_restoran) {
    return res.status(400).send('Tüm alanları doldurun.');
  } else {
    
    const ciroSql = "INSERT INTO `gunluk_ciro` (`tarih`, `restoran_id`, `restoran_ciro`, `paket_ciro`) VALUES (?, ?, ?, ?)";
    const ciroValues = [tarih, restoran_id, restoran_ciro, paket_ciro];

    db.query(ciroSql, ciroValues, (ciroErr, ciroResult) => {
      if (ciroErr) {
        return res.status(500).send('Ciro tablosuna veri eklenirken bir hata oluştu');
      }

      
      const fisSql = "INSERT INTO `gunluk_fis` (`tarih`, `restoran_id`, `fis_paket`, `fis_restoran`) VALUES (?, ?, ?, ?)";
      const fisValues = [tarih, restoran_id, fis_paket, fis_restoran];

      db.query(fisSql, fisValues, (fisErr, fisResult) => {
        if (fisErr) {
          return res.status(500).send('Fis tablosuna veri eklenirken bir hata oluştu');
        }

        res.status(200).send('Her iki tabloya da veri başarıyla eklendi');
      });
    });
  }
});




  app.get('/gunluk_ortalama_satis', (req, res) => {
    const { startDate, endDate } = req.query;
  
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Başlangıç ve bitiş tarihleri gereklidir.' });
    }
  
    db.query(
      `SELECT 
        DAYNAME(tarih) AS gun_adi,
        ROUND(AVG(fis_paket + fis_restoran)) AS ortalama_satis
      FROM 
        gunluk_fis
      WHERE 
        gunluk_fis.tarih BETWEEN ? AND ?
      GROUP BY 
        DAYNAME(tarih)
      ORDER BY 
        FIELD(DAYNAME(tarih), 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar');`,
      [startDate, endDate],
      (error, results, fields) => {
        if (error) {
          res.status(500).json({ error: 'Veritabanı hatası' });
          throw error;
        }
  
        res.json({ results });
      }
    );
  });
  

  app.get('/personel', (req, res) => {
    const baslangicTarihi = req.query.baslangic_tarihi;
    const bitisTarihi = req.query.bitis_tarihi;
  
    
    const sqlQuery = `
      SELECT 
        ROUND((gunluk_fis.fis_paket) / personel.personel_sayi) AS fis_paket,
        ROUND((gunluk_fis.fis_restoran) / personel.personel_sayi) AS fis_restoran,
        gunluk_fis.tarih
      FROM 
        gunluk_fis, restoran, personel
      WHERE 
        gunluk_fis.restoran_id = restoran.restoran_id
        AND personel.restoran_id = restoran.restoran_id
        AND gunluk_fis.tarih BETWEEN ? AND ?
    `;
  
    
    db.query(sqlQuery, [baslangicTarihi, bitisTarihi], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });



  app.post("/auth", function (req, res) {
      const password = req.body.password;
  
      db.query("SELECT * FROM user_password WHERE password=?", [password], (err, results) => {
          if (err) throw err;
  
          if (results.length > 0) {
              res.status(200).sendFile(path.join("C:/Users/brt-b/Desktop/SONWEB", "dashboard.html"));
          } else {
              res.status(200).sendFile(path.join("C:/Users/brt-b/Desktop/SONWEB","401.html"));
          }
          
          
      });
  });
  
   

