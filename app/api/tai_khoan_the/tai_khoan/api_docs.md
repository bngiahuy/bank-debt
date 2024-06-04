- [tai\_khoan](#tai_khoan)
  - [GET /api/tai\_khoan?offset=10\&limit=10](#get-apitai_khoanoffset10limit10)
  - [GET /api/tai\_khoan/:so\_tai\_khoan](#get-apitai_khoanso_tai_khoan)
  - [POST /api/tai\_khoan](#post-apitai_khoan)
  - [DELETE /api/tai\_khoan/:so\_tai\_khoan](#delete-apitai_khoanso_tai_khoan)
  - [PUT /api/tai\_khoan/:so\_tai\_khoan](#put-apitai_khoanso_tai_khoan)
  - [PATCH /api/tai\_khoan/:so\_tai\_khoan](#patch-apitai_khoanso_tai_khoan)

# tai_khoan
## GET /api/tai_khoan?offset=10&limit=10

Retrieves data from the database.

**Query Parameters**

- **offset** (optional) - Offset for pagination (default is 0)
- **limit** (optional) - Number of records per page (default is 20)

**Response**

- 500 Internal Server Error: When database query fails
- 200 OK: No error
- Returns JSON object with:
  - count (number): Total number of customer's account number records
  - next (string|null): Next page URL (null if no more pages)
  - previous (string|null): Previous page URL (null if no previous page)
  - results (array): Array of customer's account number objects

**Example**

```json
GET /api/tai_khoan?offset=0&limit=2

{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "so_tai_khoan": "55610001107552",
            "so_du": 1299000.98,
            "noi_mo": "Huế",
            "thong_tin_ky_han": null,
            "thong_tin_khong_ky_han": null,
            "ma_khach_hang": 834879,
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
            }
        },
        {
            "so_tai_khoan": "674988374",
            "so_du": 1000,
            "noi_mo": "Huế",
            "thong_tin_ky_han": "",
            "thong_tin_khong_ky_han": "",
            "ma_khach_hang": 509875,
            "khach_hang": {
                "email": null,
                "ho_ten": "Nguyễn Phương Chi",
                "cong_ty": null,
                "tam_tru": "Hồ Chí Minh",
                "can_cuoc": "046202007954",
                "ngay_sinh": "15/12/1963",
                "dien_thoai": "+84 355 534 446",
                "thuong_tru": "Thừa Thiên Huế",
                "ma_khach_hang": 509875,
                "nhan_vien_phu_trach_1": null,
                "nhan_vien_phu_trach_2": null
            }
        }
    ]
}
```

---

## GET /api/tai_khoan/:so_tai_khoan

Retrieves a specific customer's account number record by customer's account number.

**Path Parameters**

- **so_tai_khoan** (required): customer's account number to fetch

**Response**

- 200 OK: Returns requested customer's account number object
- 400 Bad Request: If invalid so_tai_khoan is passed
- 500 Internal Server Error: If database query fails

**JSON contains**

- count (number): Number of results (1 for single object)
- results (object): customer's account number data

```json
GET /api/tai_khoan/674988374

{
    "count": 1,
    "results": [
        {
            "so_tai_khoan": "674988374",
            "so_du": 1000,
            "noi_mo": "Huế",
            "thong_tin_ky_han": "",
            "thong_tin_khong_ky_han": "",
            "ma_khach_hang": 509875
        }
    ]
}
```
---
## POST /api/tai_khoan

Create a new customer's account number record in the database.

**Request Body**
- customer's account number object containing all fields
- Request body must have more than one field. 

```json
{
    "body":{
        "so_tai_khoan": "674988373",
        "so_du": "1000.0",
        "noi_mo": "Huế",
        "thong_tin_ky_han": "",
        "thong_tin_khong_ky_han": "",
        "ma_khach_hang": "509875"
    }
}
```

**Response**
- 200 Created: When new customer's account number record is inserted
- 400 Bad Request: If invalid data is passed
- 500 Internal Server Error: If insert query fails
---

## DELETE /api/tai_khoan/:so_tai_khoan

Deletes a customer's account number record from the database.

**Query Parameters**

- **so_tai_khoan** (required): customer's account number so_tai_khoan to delete

**Response**

- 200 OK: When customer's account number record is deleted successfully
  - Returns JSON object:
    - message: 'Record deleted successfully'
- 400 Bad Request: When ma_nv is invalid or missing
- 500 Internal Server Error: When delete query fails

**Example**

```json
DELETE /api/tai_khoan/2

{
  "message": "Record deleted successfully"
}
Return status 200
```
---
## PUT /api/tai_khoan/:so_tai_khoan
Update a customer's account number record by so_tai_khoan with new data.

**Path Parameters**
- **so_tai_khoan** (required): customer's account number so_tai_khoan to update

**Request Body**
- JSON object containing fields to update. It's somewhat like this:
  ```json
  {
    "body": 
    {
      "so_tai_khoan": "",
      "so_du": "",
      "noi_mo": "",
      "thong_tin_ky_han": "",
      "thong_tin_khong_ky_han": "",
      "ma_khach_hang": ""
    }
  }
  ```
Example:
```json
PUT /api/tai_khoan/674988373

{
  "body": 
  {
    "so_du": "4000000"
  }
}

Returns 200 OK and message: "Updated" on success
```

---
## PATCH /api/tai_khoan/:so_tai_khoan

Update a customer's account number record by so_tai_khoan with one new data.

**Path Parameters**
- **so_tai_khoan** (required): customer's account number so_tai_khoan to update

**Request Body**
- JSON object containing fields to update. It's somewhat like this:

```json
PATCH /api/tai_khoan/674988373
{
    "body": 
  {
    "noi_mo": "Hồ Chí Minh"
  }
}
  ```

>**Note:** **PATCH** will be used when you need to update one value. If you need to update more than one, consider using **PUT**.

