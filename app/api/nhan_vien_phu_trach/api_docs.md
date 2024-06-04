- [nhan\_vien\_phu\_trach](#nhan_vien_phu_trach)
  - [GET /api/nhan\_vien\_phu\_trach?offset=10\&limit=10](#get-apinhan_vien_phu_trachoffset10limit10)
  - [POST /api/nhan\_vien\_phu\_trach](#post-apinhan_vien_phu_trach)

# nhan_vien_phu_trach
## GET /api/nhan_vien_phu_trach?offset=10&limit=10

Retrieves data from the database.

**Query Parameters**

- **offset** (optional) - Offset for pagination (default is 0)
- **limit** (optional) - Number of records per page (default is 20)

**Response**

- 500 Internal Server Error: When database query fails
- 200 OK: No error
- Returns JSON object with:
  - count (number): Total number of records
  - next (string|null): Next page URL (null if no more pages)
  - previous (string|null): Previous page URL (null if no previous page)
  - results (array): Array of objects

**Example**

```json
GET /api/nhan_vien_phu_trach?offset=0&limit=2

{
    {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "ma_khach_hang": 834879,
            "ma_nhan_vien": "SHB-23072008",
            "khach_hang": {
                "email": null,
                "ho_ten": "Mai Minh Anh",
                "cong_ty": "Rockship",
                "tam_tru": "Hồ Chí Minh",
                "can_cuoc": "046202005106",
                "ngay_sinh": "11/1/1973",
                "dien_thoai": "+84 855 564 992",
                "thuong_tru": "Thừa Thiên Huế",
                "ma_khach_hang": 834879,
                "nhan_vien_phu_trach_1": null,
                "nhan_vien_phu_trach_2": null
            },
            "nhan_vien": {
                "ho_ten": "Nguyễn Anh Thư"
            }
        },
        {
            "ma_khach_hang": 834879,
            "ma_nhan_vien": "SHB-12052002",
            "khach_hang": {
                "email": null,
                "ho_ten": "Mai Minh Anh",
                "cong_ty": "Rockship",
                "tam_tru": "Hồ Chí Minh",
                "can_cuoc": "046202005106",
                "ngay_sinh": "11/1/1973",
                "dien_thoai": "+84 855 564 992",
                "thuong_tru": "Thừa Thiên Huế",
                "ma_khach_hang": 834879,
                "nhan_vien_phu_trach_1": null,
                "nhan_vien_phu_trach_2": null
            },
            "nhan_vien": {
                "ho_ten": "Nguyễn Hoài Nam"
            }
        }
    ]
}
}
```

---
## POST /api/nhan_vien_phu_trach

Create a new record in the database.

**Request Body**
- customer's relatives object containing all fields
- Request body must have 2 field. 

```json
{
    "body":{
        "ma_khach_hang": 834879,
        "ma_nhan_vien": "SHB-23072008"
    }
}
```

**Response**
- 200 Created: When new record is inserted
- 400 Bad Request: If invalid data is passed
- 500 Internal Server Error: If insert query fails
---