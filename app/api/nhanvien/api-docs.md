- [nhanvien](#nhanvien)
  - [GET /api/nhanvien?offset=0\&limit=20](#get-apinhanvienoffset0limit20)
  - [GET /api/nhanvien/:id](#get-apinhanvienid)
  - [POST /api/nhanvien](#post-apinhanvien)
  - [DELETE /api/nhanvien/:id](#delete-apinhanvienid)
  - [PUT /api/nhanvien/:id](#put-apinhanvienid)
  - [PATCH /api/nhanvien/:id](#patch-apinhanvienid)


# nhanvien
## GET /api/nhanvien?offset=0&limit=20

Retrieves employee data from the database in a specific range.

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
  - results (array): Array of employee objects sorted by MaNhanVien

**Example**

```json
GET /api/nhanvien?offset=0&limit=2

{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
    {
        "MaNhanVien": 1,
        "TenNhanVien": "John Doe",
    },
    {
        "MaNhanVien": 2,
        "TenNhanVien": "Jane Doe",

    }
    ]
}
```

---

## GET /api/nhanvien/:id

Retrieves a specific employee record by ID.

**Path Parameters**

- **id** (required): Employee ID to fetch

**Response**

- 200 OK: Returns requested employee object
- 400 Bad Request: If invalid ID is passed
- 500 Internal Server Error: If database query fails

**JSON contains**

- count (number): Number of results (1 for single object)
- results (object): Employee data

```json
GET /api/nhanvien/10001

{
  "count": 1,
  "results": {
    "MaNhanVien": 10001,
    "TenNhanVien": "John Doe",
    ...
  }
}
```
---
## POST /api/nhanvien

Create a new employee record in the database.

**Request Body**
- Employee object containing all fields
- **"MaNhanVien"**: Employee ID is **required**
- Request body must have more than one field. 
```json
{
  "body": 
  {
    "MaNhanVien": 10001,
    "HoTen": "John Doe",
    "SDT": "0123456789",
    "Email": "demo@gmail.com",
    "CCCD": "123456789",
    "ChucDanh": "Staff",
    "PhongBan": "Sales"
  }
  
}
```

**Response**
```json
{
  "body": "Inserted",
  "result": {
    "Email": "demo@gmail.com",
    "encrypt_password": "123asva2",
  },
  "status":200
}
```
- 200 Created: When new employee record is inserted
- 400 Bad Request: If invalid data is passed
- 500 Internal Server Error: If insert query fails
---

## DELETE /api/nhanvien/:id

Deletes an employee record from the database.

**Query Parameters**

- **id** (required): Employee ID to delete

**Response**

- 200 OK: When employee record is deleted successfully
  - Returns JSON object:
    - message: 'Record deleted successfully'
- 400 Bad Request: When ma_nv is invalid or missing
- 500 Internal Server Error: When delete query fails

**Example**

```json
DELETE /api/nhanvien/10001

{
  "message": "Record deleted successfully"
}
Return status 200
```
---
## PUT /api/nhanvien/:id
Update an employee record by ID with new data.

**Path Parameters**
- **id** (required): Employee ID to update

**Request Body**
- JSON object containing fields to update. It's somewhat like this:
  ```json
  {
    "body": 
    {
      "HoTen": "", 
      "SDT": "", 
      "CCCD": "", 
      "ChucDanh": "", 
      "PhongBan": ""
    }
  }
  ```
Example:
```json
PUT /api/nhanvien/10001

{
  "HoTen": "Jane Doe",
  "SDT": "01234567",
  "CCCD": "123456789",
  "ChucDanh": "Manager",
  "PhongBan": "Sales"
}

Returns 200 OK and message: "Updated" on success
```

---
## PATCH /api/nhanvien/:id

Update an employee record by ID with one new data.

**Path Parameters**
- **id** (required): Employee ID to update

**Request Body**
- JSON object containing fields to update. It's somewhat like this:
  ```json
  {
    "body": 
    {
      "HoTen": "", 
      "SDT": "", 
      "CCCD": "", 
      "ChucDanh": "", 
      "PhongBan": ""
    }
  }
  ```

>**Note:** **PATCH** will be used when you need to update one value. If you need to update more than one, consider using **PUT**.
