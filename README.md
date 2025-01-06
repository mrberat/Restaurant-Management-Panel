TAB GIDA bünyesinde olan FEBS GIDA BURGER KING restoranı ile anlaşarak
onların bir sorununa bilişim sistemleriyle yardımcı olmak istedik. İşletme ile yapılan
görüşmemizde işletmenin günlük raporlar anlamında bir problemin olmadığını fakat uzun
vadede raporlamalarda sıkıntı yaşadıklarını belirttiler. Ellerinde restoranın dört yıllık
verileri mevcuttu fakat veriler dağınık ve düzensizdi. Bunların düzenlenmesi ve
raporlanması için çalışmalarda bulunduk. İlk hedefimiz restoranın isteklerini
karşılamaktı. Bunun için çeşitli grafiklerle ve istekleri doğrultusunda tablolar hazırladık.
Elde ettiğimiz verileri ay bazlı, yıl bazlı ve günlük bazlı olarak raporladık. Devam eden
süreçte personel yönetimi ve ihtiyacı için personel verilerini çeşitli formüllerle ihtiyacı
kadar personel mantığıyla bir sayfa tasarladık. Fazlasıyla işletmenin taleplerini yerine
getirdik. Proje sonunda zincir restoranın nasıl işlediğini ve temel ihtiyaçlarını görmüş
olduk. İşletmeyle görüştükten sonra işleyişi pozitif yönde etkileyen projemizle birlikte
işletme daha net kararlar alabilir hale geldi. Aynı zamanda enflasyonun yükselmesiyle
işletmelerin başarı ölçütü olarak ciroyu değil misafir sayısını baz aldıklarını öğrenmiş
olduk.
1)GİRİŞ
Projeye başlarken amacımız zincir restoranların nerelerde problem yaşadıklarını
görmek ve bu işletmelere bilişim yardımıyla problemin çözümünü bulmaktı. FEBS GIDA
ile görüşmeye gittiğimizde ellerinde yaklaşık olarak dört yıllık fiş ve ciro verileri vardı
fakat Excel de tutulmasına rağmen bazı günlerin cirosu eksikti ya da paket ve restoran
cirosu olarak ayrılamamıştı. Tahminlemeler ve raporlar oluşturulamıyordu çünkü dağınık
ve düzenlenmemiş veriler vardı. İşletme ana merkezinden sadece günlük kasa raporlarını
ve fiş sayılarını alabiliyordu. Aynı zamanda TAB GIDA’YA %17 oranda cirodan pay
vermek zorundaydı fakat yıllık ve aylık verilerini düzenleyemediği için bunun
kıyaslamasını tam olarak yapamıyordu. Bu problemlere bilişim sistemleri ile çare
bulabileceğimizi anladık ve bu projeyle işletmenin sorunlarını çeşitli raporlamalarla ve
grafiklerle çözdük.
2
2)YÖNTEM
Yaptığımız projede şelale yöntemini kullandık çünkü yapılması gerekenleri
sırayla aşama aşama hallettik. İşletmenin problemlerine çözüm bulmak için web tabanlı
bir program yazmaya karar verdik. Projeye başlarken ilk önce işletmenin verilerini aldık
Excel üzerinde düzenlemeler yapıldıktan bu verilerin analiziz yapıldı ve bu verilerle
ilişkisel bir veri tabanı kurmaya karar verdik. Özellikle ilişkisel veri tabanını tercih
etmemizin sebebi her yılın, ayın, günün tarih üzerinde birbiriyle bağlı olmasıdır. Veri
tabanı için MySQL kullandık. Veri tabanından istenilen problemlerin çözümü için talepler
üzerine sorguları yazdık. Daha sonra bilgisayarımızı sunucu haline getirmek için Node.js
kullandık. Node.js ile server kurulumunu yaptık ve veri tabanımızdan elde ettiğimiz
sonuçları grafiklere ve tablolara aktardık. Kullanıcının rahat etkileşimi için basit ve
dinamik bir tasarım kullandık. Web tasarımı için html ve css kullandık. Kullanıcı istediği
iki tarih arasında ciro ve fiş bilgilerini görebilir, günlük ciro ve fiş bilgilerini girebilir,
aylık ve günlük ciro, fiş ortalamalarını görebilir, personel bilgilerini görebilir şekilde bir
uygulama yazıldı. Gün sonunda paket ve restoran cirosunu ayrı ayrı görebilir ve bunun
yanında fiş sayısının paket ve restoran ayrımı yapılmıştır. Bunun sayesinde başarı ölçütü
olarak görülen fiş sayısının hangi tarafta fazla olduğunu görebilir. Bu işlem aylık, yıllık
ve günlük olmak üzere tasarlanmıştır. Uygulama sadece yatırımcıya özel olduğu için tek
bir user_password etkileşimi yaptık. Bunların tamamını SQL üzerinde yaptığımız
sorguları çeşitli chartlara entegre ederek oluşturduk. Kullandığımız teknolojiler MySQL,
HTML, CSS, Node.js ve JavaScript olarak sıralayabiliriz. SQL ile veri analizi yapıldı,
HTML ve CSS ile sayfa tasarımı yapıldı ve Node.js ile bilgisayarımızı sunucu haline
getirdik.
![resim](https://github.com/user-attachments/assets/fe7c5c68-c0c2-4c0e-a885-4bca8e5390e6)

![resim](https://github.com/user-attachments/assets/9e2352c5-4dbc-4407-8081-ffa5e2dda812)

![resim](https://github.com/user-attachments/assets/29308688-446a-4d39-8bfb-2f273d1f5be3)

![resim](https://github.com/user-attachments/assets/db0831e3-b152-47ed-957d-a17eee088085)


![resim](https://github.com/user-attachments/assets/2ab85a23-9722-4721-950e-9ad075835ebe)

![resim](https://github.com/user-attachments/assets/f35247d7-f2a8-4493-a44e-5e54f4768f4d)




