# POST /api/filter_lichhen

Retrieve result by sending data in filters using search function

**Request Body**
- Request Body must have more than one key.
- Request Body must be JSON format
- Request Body inside must contains at least one of these keys: (no need to be in-order)
  - ma_khach_hang
  - ten_khach_hang
  - can_cuoc
  - so_tien_kk
  - id_nguoi_uy_quyen (reference to ma_nhan_vien)
  - trang_thai_kk
  - trang_thai_tha
  - tinh_tp
  - quan_huyen
  - tu_ngay (format: `yyyy-mm-dd`)
  - den_ngay (format: `yyyy-mm-dd`)
  
```json
POST body
{
    "filter":{
        "ten_khach_hang": "Dương Mỹ Duyên",
        "tu_ngay": "2024-01-01",
        "den_ngay": "2024-02-27"
    }
}
```

**Response**
- 200 Created: When query is successful
- 400 Bad Request: If invalid data is passed
- 500 Internal Server Error: If query fails (wrong format)
```json
{
    "count": 2,
    "next": null,
    "prev": null,
    "result": [
        {
            "id": 3,
            "ngay_hen": "Wed Feb 28 2024 00:00:00 GMT+0700 (Indochina Time)",
            "noi_dung_hen": "Nộp TUAP",
            "trang_thai_lich_hen": "Nhập mới",
            "ngay_tao_lich_hen": "2024-02-02T02:15:54.21844+00:00",
            "ngay_cap_nhat": "2024-02-02 09:15:55",
            "ma_khach_hang": 519455,
            "ten_khach_hang": "Dương Mỹ Duyên",
            "can_cuoc": "046202002065",
            "id_nguoi_uy_quyen": "NDH-20240001",
            "ten_nhan_vien": "Trần Thị Thơ",
            "ma_khoi_kien": 15,
            "trang_thai_kk": "Nộp hồ sơ",
            "so_tien_kk": 100000000,
            "tinh_tp": "Bắc Giang",
            "quan_huyen": "Huyện Yên Thế",
            "ma_thi_hanh_an": null,
            "trang_thai_tha": null
        },
        {
            "id": 4,
            "ngay_hen": "Wed Feb 21 2024 00:00:00 GMT+0700 (Indochina Time)",
            "noi_dung_hen": "Nộp hồ sơ khởi kiện",
            "trang_thai_lich_hen": "Nhập mới",
            "ngay_tao_lich_hen": "2024-02-02T02:17:10.195817+00:00",
            "ngay_cap_nhat": "2024-02-02 09:17:11",
            "ma_khach_hang": 519455,
            "ten_khach_hang": "Dương Mỹ Duyên",
            "can_cuoc": "046202002065",
            "id_nguoi_uy_quyen": "SHB-23072008",
            "ten_nhan_vien": "Nguyễn Anh Thư",
            "ma_khoi_kien": 15,
            "trang_thai_kk": "Nộp hồ sơ",
            "so_tien_kk": 100000000,
            "tinh_tp": "Bắc Giang",
            "quan_huyen": "Huyện Yên Thế",
            "ma_thi_hanh_an": null,
            "trang_thai_tha": null
        }
    ]
}
```