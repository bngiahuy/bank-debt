create table
  public."KhachHang" (
    "IDKhachHang" bigint generated by default as identity,
    "CCCD" text not null default ''::text,
    "Ho_ten" text not null default ''::text,
    "Email" text null,
    "DiaChiThuongTru" text null,
    "DiaChiTamTru" text null,
    "SDT" text null,
    "TenCongTy" text null,
    "DiaChiCongTy" text null,
    constraint KhachHang_pkey primary key ("IDKhachHang"),
    constraint unique_customer_cccd unique ("CCCD"),
    constraint unique_customer_name unique ("Ho_ten")
  ) tablespace pg_default;

create table
  public."NhanVien" (
    "MaNhanVien" integer generated by default as identity,
    "HoTen" text null,
    "ChucDanh" text null,
    "CCCD" text null,
    "Email" character varying null,
    "SDT" text null,
    "Nhom" text null,
    "PhongBan" text null,
    encrypted_password text not null default substr(md5((random())::text), 0, 8),
    constraint NhanVien_pkey primary key ("MaNhanVien"),
    constraint NhanVien_MaNhanVien_check check (("MaNhanVien" <= 99999)),
    constraint NhanVien_TenNhanVien_check check ((length("HoTen") <= 50)),
    constraint NhanVien_encrypted_password_check check ((length(encrypted_password) >= 6))
  ) tablespace pg_default;

create table
  public.tai_khoan_tien_gui (
    so_tai_khoan integer not null,
    hinh_thuc text null,
    so_du text null,
    noi_mo text null,
    ma_khach_hang integer null,
    ngay_mo timestamp without time zone null default now(),
    constraint tai_khoan_tien_gui_pkey primary key (so_tai_khoan),
    constraint tai_khoan_tien_gui_ma_khach_hang_fkey foreign key (ma_khach_hang) references khach_hang (ma_khach_hang) on update cascade on delete set null
  ) tablespace pg_default;

create table
  public.thong_tin_du_no (
    id uuid not null default gen_random_uuid (),
    khu_vuc text not null,
    chi_nhanh text null,
    don_vi_chiu_no text null,
    don_vi_quan_ly_ho_so text null,
    so_the character varying null,
    stk_the character varying null,
    ngay_qua_han timestamp without time zone null,
    nhom_no text null,
    no_goc_nhan_uy_thac real null,
    no_lai_nhan_uy_thac real null,
    tong_du_no_uy_thac real null,
    no_goc_hien_tai real null,
    no_lai_hien_tai real null,
    tong_du_no_hien_tai real null,
    so_tien_da_thanh_toan real null,
    lai_suat_trong_han_ap_dung real null,
    lai_suat_qua_han_ap_dung real null,
    han_muc real null,
    ma_chinh_sach integer generated by default as identity,
    ten_chinh_sach_cap_the text null,
    tien_do_cn_pgd smallint null,
    ghi_chu_tien_do text null,
    id_khach_hang bigint null,
    ngay_cap_nhat timestamp without time zone null,
    nhan_vien_cap_nhat integer null,
    constraint ThongTinDuNo_pkey primary key (id),
    constraint thong_tin_du_no_id_khach_hang_fkey foreign key (id_khach_hang) references "KhachHang" ("IDKhachHang") on update cascade on delete set null,
    constraint thong_tin_du_no_nhan_vien_cap_nhat_fkey foreign key (nhan_vien_cap_nhat) references "NhanVien" ("MaNhanVien") on update cascade on delete restrict
  ) tablespace pg_default;

create table
  public.thong_tin_file_scan_ho_so_phap_ly (
    id bigint generated by default as identity,
    ten_file text not null default ''::text,
    nhan_vien_thuc_hien bigint not null,
    ngay_thuc_hien timestamp without time zone null,
    nhan_vien_xoa bigint null,
    ngay_xoa timestamp without time zone null,
    constraint ThongTinFileScanHoSoPhapLy_pkey primary key (id)
  ) tablespace pg_default;

create table
  public.thong_tin_nguoi_than_khach_hang (
    id bigint generated by default as identity,
    id_khach_hang bigint not null,
    name text null,
    sdt text null,
    relationship text null,
    constraint thong_tin_nguoi_than_khach_hang_pkey primary key (id),
    constraint thong_tin_nguoi_than_khach_hang_id_khach_hang_fkey foreign key (id_khach_hang) references "KhachHang" ("IDKhachHang") on update cascade
  ) tablespace pg_default;


create table
  public.tien_do_kien_thi_hanh_an (
    id bigint generated by default as identity,
    id_khach_hang bigint not null,
    so_tien_kk real null,
    trang_thai_kk text null,
    trang_thai_tha text null,
    trang_thai_ap text null,
    tinh_tp text null,
    quan_huyen text null,
    id_to_trinh_dgkk bigint null,
    ngay_tao_khoi_kien timestamp with time zone not null default now(),
    constraint TienDoKien_ThiHanhAn_pkey primary key (id),
    constraint TienDoKien_ThiHanhAn_IDKhachHang_key unique (id_khach_hang),
    constraint tien_do_kien_thi_hanh_an_id_khach_hang_fkey foreign key (id_khach_hang) references "KhachHang" ("IDKhachHang") on update cascade,
    constraint tien_do_kien_thi_hanh_an_id_to_trinh_dgkk_fkey foreign key (id_to_trinh_dgkk) references to_trinh_danh_gia_khoi_kien (id) on update cascade
  ) tablespace pg_default;

create table
  public.to_trinh_danh_gia_khoi_kien (
    id bigint generated by default as identity,
    "TrangThai" text not null,
    "NgayTao" timestamp without time zone null,
    "NhanVienPhuTrach" integer null,
    constraint ToTrinhDanhGiaKhoiKien_pkey primary key (id),
    constraint to_trinh_danh_gia_khoi_kien_NhanVienPhuTrach_fkey foreign key ("NhanVienPhuTrach") references "NhanVien" ("MaNhanVien") on update cascade on delete restrict
  ) tablespace pg_default;

create table
  public.to_trinh_giam_lai (
    id bigint generated by default as identity,
    "TrangThai" text not null default ''::text,
    "NgayTao" timestamp without time zone null,
    "NhanVienPhuTrach" integer null,
    constraint ToTrinhGiamLai_pkey primary key (id),
    constraint to_trinh_giam_lai_NhanVienPhuTrach_fkey foreign key ("NhanVienPhuTrach") references "NhanVien" ("MaNhanVien") on update cascade on delete restrict
  ) tablespace pg_default;

INSERT INTO "KhachHang" ("CCCD", "Ho_ten", "Email", "DiaChiThuongTru", "DiaChiTamTru", "SDT", "TenCongTy", "DiaChiCongTy")
VALUES ('123123123', N'Nguyễn Văn A', 'nguyenvana@email.com', N'Hà Nội', NULL, '0123123123', NULL, NULL);

INSERT INTO "KhachHang" ("CCCD", "Ho_ten", "Email", "DiaChiThuongTru", "DiaChiTamTru", "SDT", "TenCongTy", "DiaChiCongTy")  
VALUES ('234234234', N'Trần Thị B', 'tranthib@email.com', N'TP HCM', NULL, '0234234234', NULL, NULL);

INSERT INTO "KhachHang" ("CCCD", "Ho_ten", "Email")
VALUES ('345345345', N'Lê Văn C', 'levanc@email.com'); 

INSERT INTO "KhachHang" ("CCCD", "Ho_ten", "DiaChiThuongTru") 
VALUES ('456756756', N'Phạm Thị D', N'Đà Nẵng');

INSERT INTO "KhachHang" ("CCCD", "Ho_ten", "SDT")
VALUES ('567567567', N'Ngô Đức E', '0567567567');

INSERT INTO "NhanVien" ("HoTen", "ChucDanh", "CCCD", "Email", "SDT", "Nhom", "PhongBan")
VALUES (N'Nguyễn Văn A', N'Trưởng phòng', '123123123', 'nguyenvana@email.com', '0123123123', N'Quản lý', N'Tín dụng');

INSERT INTO "NhanVien" ("HoTen", "ChucDanh", "CCCD", "SDT", "Nhom", "PhongBan" )
VALUES (N'Lê Thị B', N'Chuyên viên', '234234234', '023423423', N'Kế toán', N'Kế toán');

INSERT INTO "NhanVien" ("HoTen", "Email", "SDT", "Nhom", "PhongBan")
VALUES (N'Trần Văn C', 'tranvanc@email.com', '0345345345', N'Tín dụng', N'Pháp chế');   

INSERT INTO "NhanVien" ("HoTen", "ChucDanh")  
VALUES (N'Ngô Thị D', N'Chuyên viên');

INSERT INTO "NhanVien" ("HoTen", "SDT", "Nhom")
VALUES (N'Phạm Văn E', '0456756756', N'Tín dụng');
