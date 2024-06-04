- [filter\_khoikien](#filter_khoikien)
  - [POST /api/filter\_khoikien](#post-apifilter_khoikien)

# filter_khoikien
## POST /api/filter_khoikien

Retrieve result by sending data in filters using search function

**Request Body**
- Request Body must have more than one key.
- Request Body must be JSON format
- Request Body inside must contains at least one of these keys: (no need to be in-order)
  - ma_khoi_kien
  - trang_thai
  - tinh_tp
  - quan_huyen
  - so_tien_kk
  - ma_khach_hang
  - ho_ten
  - can_cuoc
  - ma_nhan_vien
  - tu_ngay (format: `yyyy-mm-dd`)
  - den_ngay (format: `yyyy-mm-dd`)
```json
{
    "filter":{
        "ma_khoi_kien":15,
        "ho_ten": "Dương Mỹ Duyên",
        "tu_ngay": "2024-02-01",
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
    "count": 1,
    "next": null,
    "prev": null,
    "result": [
        {
            "ma_khoi_kien": 15,
            "trang_thai": "Nộp hồ sơ",
            "tinh_tp": "Bắc Giang",
            "created_at": "2024-02-01T10:56:23.758954+00:00",
            "updated_at": "2024-02-01T17:56:24+00:00",
            "quan_huyen": "Huyện Yên Thế",
            "so_tien_kk": 100000000,
            "ma_khach_hang": 519455,
            "ho_ten": "Dương Mỹ Duyên",
            "can_cuoc": "046202002065",
            "ma_nv_uy_quyen": "SHB-20240001",
            "ten_nv_uy_quyen": "Lê Thành Trung"
        }
    ]
}
```
