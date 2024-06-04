# GET /api/dashboard/quanlykhachhang?

Retrieves total number of proportions based on the "Hanh dong thu hoi no" activity ID, group by employees.

**Query Parameters**

- **offset** (optional) - Offset for pagination (default is 0)
- **limit** (optional) - Number of records per page (default is 20)
- **from** (optional) - Retrieves total number of proportions from "from" date
- **to** (optional) - Retrieves total number of proportions to "to" date

**Response**

- 500 Internal Server Error: When database query fails
- 200 OK: No error
- Returns JSON object with:
  - count (number): Total number of records
  - next (string|null): Next page URL (null if no more pages)
  - previous (string|null): Previous page URL (null if no previous page)
  - results (array): Data response.

**Example**

`GET /api/dashboard/quanlykhachhang?offset=0&limits=10`
**Response**:

```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "tong_ty_trong": 25,
      "ma_nhan_vien": "NDH-20240001",
      "nhan_vien": {
        "ho_ten": "Trần Thị Thơ",
        "chuc_danh": "Tổng giám đốc",
        "phong_ban": "Thu hồi nợ"
      }
    }
  ]
}
```
