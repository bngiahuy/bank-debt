- [nguoi\_than\_khach\_hang](#nguoi_than_khach_hang)
  - [GET /api/nguoi\_than\_khach\_hang?offset=10\&limit=10](#get-apinguoi_than_khach_hangoffset10limit10)
  - [GET /api/nguoi\_than\_khach\_hang/:id](#get-apinguoi_than_khach_hangid)
  - [POST /api/nguoi\_than\_khach\_hang](#post-apinguoi_than_khach_hang)
  - [DELETE /api/nguoi\_than\_khach\_hang/:id](#delete-apinguoi_than_khach_hangid)
  - [PUT /api/nguoi\_than\_khach\_hang/:id](#put-apinguoi_than_khach_hangid)
  - [PATCH /api/nguoi\_than\_khach\_hang/:id](#patch-apinguoi_than_khach_hangid)

# nguoi_than_khach_hang
## GET /api/nguoi_than_khach_hang?offset=10&limit=10

Retrieves data from the database.

**Query Parameters**

- **offset** (optional) - Offset for pagination (default is 0)
- **limit** (optional) - Number of records per page (default is 20)

**Response**

- 500 Internal Server Error: When database query fails
- 200 OK: No error
- Returns JSON object with:
  - count (number): Total number of customer's relatives records
  - next (string|null): Next page URL (null if no more pages)
  - previous (string|null): Previous page URL (null if no previous page)
  - results (array): Array of customer's relatives objects sorted by id

**Example**

```json
GET /api/nguoi_than_khach_hang?offset=0&limit=2

{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "ho_ten": "Bùi Nguyễn Gia Huy",
            "can_cuoc": "066202012032",
            "sdt": "0856912349",
            "thuong_tru": "Thủ Đức, HCM",
            "ma_khach_hang": 775714,
            "moi_quan_he": "Cha",
            "email": "abc@gmail.com",
            "khach_hang": {
                "email": null,
                "ho_ten": "Ngô Khánh Ngân",
                "cong_ty": null,
                "tam_tru": "Hồ Chí Minh",
                "can_cuoc": "046202003938",
                "ngay_sinh": "28/10/1984",
                "dien_thoai": "+84 555 575 740",
                "thuong_tru": "Thừa Thiên Huế",
                "ma_khach_hang": 775714,
                "nhan_vien_phu_trach_1": null,
                "nhan_vien_phu_trach_2": null
            }
        },
        {
            "id": 2,
            "ho_ten": "Nguyễn Văn Thành",
            "can_cuoc": "066202012033",
            "sdt": "0856915349",
            "thuong_tru": "Thủ Đức, HCM",
            "ma_khach_hang": 443183,
            "moi_quan_he": "Cha",
            "email": "duy12@gmail.com",
            "khach_hang": {
                "email": null,
                "ho_ten": "Võ Kim Hoa",
                "cong_ty": null,
                "tam_tru": "Hồ Chí Minh",
                "can_cuoc": "046202003544",
                "ngay_sinh": "16/11/1983",
                "dien_thoai": "+84 555 591 459",
                "thuong_tru": "Thừa Thiên Huế",
                "ma_khach_hang": 443183,
                "nhan_vien_phu_trach_1": null,
                "nhan_vien_phu_trach_2": null
            }
        }
    ]
}
```

---

## GET /api/nguoi_than_khach_hang/:id

Retrieves a specific customer's relatives record by ID.

**Path Parameters**

- **id** (required): customer's relatives ID to fetch

**Response**

- 200 OK: Returns requested customer's relatives object
- 400 Bad Request: If invalid ID is passed
- 500 Internal Server Error: If database query fails

**JSON contains**

- count (number): Number of results (1 for single object)
- results (object): customer's relatives data

```json
GET /api/nguoi_than_khach_hang/1

{
    "count": 1,
    "results": [
        {
            "id": 1,
            "ho_ten": "Bùi Nguyễn Gia Huy",
            "can_cuoc": "066202012032",
            "sdt": "0856912349",
            "thuong_tru": "Thủ Đức, HCM",
            "ma_khach_hang": 775714,
            "moi_quan_he": "Cha",
            "email": "abc@gmail.com",
            "khach_hang": {
                "email": null,
                "ho_ten": "Ngô Khánh Ngân",
                "cong_ty": null,
                "tam_tru": "Hồ Chí Minh",
                "can_cuoc": "046202003938",
                "ngay_sinh": "28/10/1984",
                "dien_thoai": "+84 555 575 740",
                "thuong_tru": "Thừa Thiên Huế",
                "ma_khach_hang": 775714,
                "nhan_vien_phu_trach_1": null,
                "nhan_vien_phu_trach_2": null
            }
        }
    ]
}
```
---
## POST /api/nguoi_than_khach_hang

Create a new customer's relatives record in the database.

**Request Body**
- customer's relatives object containing all fields
- Request body must have more than one field. 

```json
{
    "body":{
        "ho_ten": "Nguyễn Văn Duy",
        "can_cuoc":"066202512033",
        "sdt": "0856915349",
        "email":"duy12@gmail.com",
        "thuong_tru":"Thủ Đức, HCM",
        "ma_khach_hang": "443183",
        "moi_quan_he": "Cha"
    }
}
```

**Response**
- 200 Created: When new customer's relatives record is inserted
- 400 Bad Request: If invalid data is passed
- 500 Internal Server Error: If insert query fails
---

## DELETE /api/nguoi_than_khach_hang/:id

Deletes a customer's relatives record from the database.

**Query Parameters**

- **id** (required): customer's relatives ID to delete

**Response**

- 200 OK: When customer's relatives record is deleted successfully
  - Returns JSON object:
    - message: 'Record deleted successfully'
- 400 Bad Request: When ma_nv is invalid or missing
- 500 Internal Server Error: When delete query fails

**Example**

```json
DELETE /api/nguoi_than_khach_hang/2

{
  "message": "Record deleted successfully"
}
Return status 200
```
---
## PUT /api/nguoi_than_khach_hang/:id
Update a customer's relatives record by ID with new data.

**Path Parameters**
- **id** (required): customer's relatives ID to update

**Request Body**
- JSON object containing fields to update. It's somewhat like this:
  ```json
  {
    "body": 
    {
      "ho_ten": "",
        "can_cuoc":"",
        "sdt": "",
        "email":"",
        "thuong_tru":"",
        "ma_khach_hang": "",
        "moi_quan_he": ""
    }
  }
  ```
Example:
```json
PUT /api/nguoi_than_khach_hang/2

{
  "body": 
  {
    "sdt": "0967553728",
    "thuong_tru": "Buôn Ma Thuột, Đăk Lăk"
  }
}

Returns 200 OK and message: "Updated" on success
```

---
## PATCH /api/nguoi_than_khach_hang/:id

Update a customer's relatives record by ID with one new data.

**Path Parameters**
- **id** (required): customer's relatives ID to update

**Request Body**
- JSON object containing fields to update. It's somewhat like this:

```json
PATCH /api/nguoi_than_khach_hang/2
{
    "body": 
  {
    "can_cuoc": "066202012322"
  }
}
  ```

>**Note:** **PATCH** will be used when you need to update one value. If you need to update more than one, consider using **PUT**.

