# GET /api/dashboard/quanlykhachhang?

Retrieves total number of customers managed by employees.

**Query Parameters**

- **offset** (optional) - Offset for pagination (default is 0)
- **limit** (optional) - Number of records per page (default is 20)

**Response**

- 500 Internal Server Error: When database query fails
- 200 OK: No error
- Returns JSON object with:
  - count (number): Total number of employee records
  - next (string|null): Next page URL (null if no more pages)
  - previous (string|null): Previous page URL (null if no previous page)
  - results (array): Data response.

**Example**

`GET /api/dashboard/quanlykhachhang?offset=0&limits=10`
**Response**:

```json
{
    "count": 5,
    "next": null,
    "previous": null,
    "results": [
        {
            "total_customers": 1,
            "ma_nhan_vien": "NDH-20240001",
            "nhan_vien": {
                "ho_ten": "Trần Thị Thơ",
                "chuc_danh": "Tổng giám đốc",
                "phong_ban": "Thu hồi nợ"
            }
        },
        {
            "total_customers": 2,
            "ma_nhan_vien": "NDH-20240002",
            "nhan_vien": {
                "ho_ten": "Lê Thiện Nhân",
                "chuc_danh": "Trưởng phòng",
                "phong_ban": "Tài chính"
            }
        },
        {
            "total_customers": 2,
            "ma_nhan_vien": "NPD-20240002",
            "nhan_vien": {
                "ho_ten": "Nông Thị Mỹ Duyên",
                "chuc_danh": "Trưởng phòng",
                "phong_ban": "Thu hồi nợ"
            }
        }
    ]
}
```

