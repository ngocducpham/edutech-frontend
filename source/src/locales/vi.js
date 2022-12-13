export default {
    translation: {
        toast: {
            titleSuccess: 'Thành công',
            titleError: 'Lỗi',
            titleWarning: 'Thông tin lỗi'
        }
    },
    masterLayout: {
        breadcrumbs: {
            home: 'Trang chủ',
        },
    },
    navSider: {
        'Account Management': 'Quản lý tài khoản',
        'Admin': 'Quản trị viên',
        'Employee Collaborator': 'Quản lý CTV',
        'System': 'Hệ thống',
        'Role': 'Quyền',
        'Product': 'Sản phẩm',
        'Category': 'Danh mục',
        'News': 'Tin tức',
        'NewsCommon': 'Tin tức chung',
        'Major': 'Chuyên ngành',
        'Subject': 'Môn học',
        'Course': 'Quản lý lớp học',
        'Province': 'Tỉnh thành',
        'Teacher':'Giảng Viên',
        'Student': 'Sinh viên',
        'My Subject': 'Môn học của tôi',
        'Syllabus': 'Giáo án',
        'Class': 'Lớp học',
        'ClassList': 'Danh sách lớp',
        'StudentClassList': 'Thành viên lớp'
    },
    appHeader: {
        profile: 'Hồ sơ',
        teacherMySubject: 'Môn học',
        logout: 'Đăng xuất',
    },
    constants: {
        Administrator: "Quản trị viên",
        Active: "Kích hoạt",
        Unactive: "Khóa",
        Lock: "Khóa",
        Delete: "Xóa",
        Service: 'Dịch vụ',
        Female: 'Nữ',
        Male: 'Nam',
        UndefinedSex: 'Đang cập nhật',
        OtherSex: 'Khác',
        Forbidden: 'Bị cấm',
        Pending: 'Đang chờ',
        Active: 'Hoạt động',
        Pause: 'Tạm dừng',
        Done: 'Hoàn thành',
        Cancel: 'Đã hủy',
        Calculated: 'Đã tính',
        yes: 'Có',
        no: 'Không',
        platinum: 'Bạch kim',
        silver: 'Bạc',
        gold: 'Vàng',
        diamond: 'Kim cương',
        NotDone: 'Chưa hoàn thành',
        NewsKindInternal: 'Tin tức nội bộ',
        NewsKindCollaborator: 'Tin tức CTV',
        Province: "Tỉnh",
        District: "Quận/huyện",
        Commune: "Xã/phường",
        successMessage: {
            copied: 'Đã sao chép',
        }
    },
    listBasePage: {
        update: 'Cập nhật',
        create: 'Tạo mới',
        success: 'Thành công',
        error: 'Lỗi',
        showSuccessMessage: ' {{ actionName, capitalize }} {{ objectName, lowercase }} thành công!',
        showErrorMessage: ' {{ actionName, capitalize }} {{ objectName, lowercase }} thất bại. Vui lòng thử lại!',
        showDeleteSuccessMessage: 'Xóa {{ objectName, lowercase }} thành công!',
        showDeleteErrorMessage: 'Xóa {{ objectName, lowercase }} thất bại. Vui lòng thử lại!',
        active: 'Hoạt động',
        lock: 'khóa',
        titleConfirm: 'Bạn có chắc muốn {{ actionName, lowercase }} {{ objectName, lowercase }} này?',
        okText: 'Có',
        cancleText: 'Không',
        titleActionCol: 'Hành động',
        titleStatusCol: 'Trạng thái',
    },
    basicModal: {
        updateTitle: 'CẬP NHẬT {{ objectName, uppercase }}',
        createTitle: 'THÊM MỚI {{ objectName, uppercase }}',
        closeButton: 'Đóng',
        saveButton: 'Lưu',
    },
    baseField: {
        select: 'chọn',
        enter: 'nhập',
        requiredMsg: 'Vui lòng {{ action, lowercase }} {{ fieldTitle, lowercase }}',
        imageTooLarge: 'Hình tải lên cần nhỏ hơn 500KB!',
    },
    fileUploadField: {
        clickToUpload: 'Nhấp vào để tải lên',
    },
    cropImageFiled: {
        uploading: 'Đang tải lên',
        upload: 'Tải lên',
    },
    richTextField: {
        limitFileSize: 'Dung lượng hình cần phải nhỏ hơn 512KB. Vui lòng tải lên dung lượng nhỏ hơn!',
    },
    textField: {
        maxLengthMsg: 'Số ký tự không thể nhiều hơn {{ var }}',
        minLengthMsg: 'Số ký tự không thể ít hơn {{ var }}',
        invalidEmailMsg: 'Định dạng email không hợp lệ',
    },
    searchForm: {
        searchButton: 'Tìm kiếm',
        clearButton: 'Làm mới',
    },
    notFound: {
        notFoundMsg: 'Trang bạn đang tìm kiếm không tồn tại',
        goBack: 'Quay lại',
    },
    ForbiddenListPage: {
        breadcrumbs: {
            currentPage: 'Bị cấm'
        },
        message: {
            forbiddenMessage: 'Bạn không có quyền truy cập'
        }
    },
    profilePage: {
        breadcrumbs: {
            currentPage: 'Hồ sơ'
        },
        form: {
            label: {
                avatar: 'Hình đại diện',
                username: 'Tài khoản',
                fullName: 'Họ và tên',
                phone: 'Số điện thoại',
                taxNumber: 'Mã số thuế',
                zipCode: 'Mã Zip',
                city: 'Thành phố',
                address: 'Địa chỉ',
                logo: 'Logo',
                oldPassword: 'Mật khẩu hiện tại',
                newPassword: 'Mật khẩu mới',
                confirmNewPassword: 'Xác nhận mật khẩu mới',
                organizeName: 'Tên đơn vị',
                organizeHotline: 'Đường dây nóng',
                province: 'Tỉnh',
                district: 'Quận/huyện',
                commune: 'Xã/phường',
                contactName: 'Tên liên lạc',
                contactTitle: 'Thông tin người liên lạc',
                Male: 'Nam',
                kind: 'Thể loại',
                identityNumber: 'Mã CMND',
                sex: 'Giới tính',
                birthday: 'Sinh nhật',
                placeOfIssue: 'Nơi cấp',
                dateOfIssue: 'Ngày cấp',
                departmentName: 'Phòng ban',
                email: 'Địa chỉ e-mail',
                major: 'Chuyên ngành',
                admissionYear : 'Năm nhập học',
                degree: 'Học vị'
            },
            fieldSet: {
                profileInfo: 'Thông tin hồ sơ',
                accountInfo: 'Thông tin tài khoản',
                legalInfo: 'Thông tin pháp lý',
            },
            validationMessage: {
                fullNameRequire: 'Vui lòng nhập họ và tên',
                passwordRequire: 'Vui lòng nhập mật khẩu',
                passwordNotMatch: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            updateProfileFail: 'Cập nhật hồ sơ thất bại. Vui lòng thử lại!',
            updateProfileSuccess: 'Hồ sơ của bạn đã được cập nhật!',
        },
        button: {
            update: 'Cập nhật',
        }
    },
    userAdminListPage: {
        breadcrumbs: {
            currentPage: 'Quản trị viên'
        },
        objectName: 'quản trị viên',
        searchPlaceHolder: {
            username: 'Tài khoản đăng nhập',
            fullName: 'Họ và tên',
            status: 'Chọn trạng thái',
            organize: 'Chọn đơn vị',
        },
        table: {
            avatar: '#',
            username: 'Tên đăng nhập',
            fullName: 'Họ và tên',
            phone: 'Số điện thoại',
            createdDate: 'Ngày tạo',
            organize: 'Đơn vị',
        },
        form: {
            label: {
                avatar: 'Ảnh đại diện',
                username: 'Tên đăng nhập',
                fullName: 'Họ và tên',
                password: 'Mật khẩu',
                confirmPassword: 'Xác nhận mật khẩu',
                newPassword: 'Mật khẩu mới',
                confirmNewPassword: 'Xác nhận mật khẩu mới',
                groupPermission: 'Nhóm quyền',
                phone: 'Số điện thoại',
                language: 'Ngôn ngữ',
                status: 'Trạng thái',
                organization: 'Đơn vị',
                organizationPlaceHolder: 'Hãy chọn đơn vị',
            },
            validationMessage: {
                phoneLengthRequire: 'Hãy nhập số',
                comparePassword: 'Mật khẩu bạn nhập không khớp!',
            }
        },
        message: {
            // updateProfileFail: 'Your profile failed. Please try again!',
            // updateProfileSuccess: 'Your profile have been updated!'
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    categoryListPage: {
        breadcrumbs: {
            currentPage: 'Danh mục',
        },
        objectName: 'danh mục',
        searchPlaceHolder: {
            name: 'Tên',
            status: 'Chọn trạng thái',
        },
        table: {
            name: 'Tên',

        },
        form: {
            label: {
                avatar: 'Ảnh đại diện',
                categoryName: 'Tên danh mục',
                categoryDescription: 'Mô tả',
                status: 'Trạng thái',
            },
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    groupPermissionListPage: {
        breadcrumbs: {
            currentPage: 'Nhóm quyền',
        },
        objectName: 'Nhóm',
        table: {
            name: 'Tên',
            description: 'Mô tả',
        },
        searchPlaceholder: {
            name: 'Tên',
            description: 'mô tả'
        },
        form: {
            label: {
                name: 'Tên',
                value: 'Giá trị',
                description: 'Mô tả',
                status: 'Trạng thái',
                kind: 'Loại',
                groupPermission: 'Nhóm quyền',
            },
            validationMessage: {
                permission: 'Vui lòng chọn nhóm quyền',
            }
        },
    },
    adminNewsListPage: {
        breadcrumbs: {
            currentPage: 'Tin tức'
        },
        objectName: 'tin tức',
        newsPreviewTitle: 'BẢN XEM THỬ',
        searchPlaceHolder: {
            title: 'Tiêu đề',
            status: 'Chọn trạng thái',
            category: 'Chọn thể loại',
        },
        table: {
            avatar: '#',
            title: 'Tiêu đề',
            createdDate: 'Ngày tạo',
            ordering: 'Thứ tự',
            category: 'Thể loại',
            pinTop: 'Ghim',
        },
        form: {
            label: {
                avatar: 'Ảnh đại diện',
                title: 'Tiêu đề',
                category: 'Thể loại',
                status: 'Trạng thái',
                ordering: 'Thứ tự',
                description: 'Mô tả',
                content: 'Nội dung',
                pinTop: 'Ghim lên đầu',
                banner: 'Ảnh bìa',
            },
            validationMessage: {
                avatarRequire: 'Hãy chọn ảnh đại diện',
                bannerRequire: 'Hãy chọn banner',
            }
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    majorListPage: {
        breadcrumbs: {
            currentPage: 'Chuyên ngành',
        },
        objectName: 'chuyên ngành',
        searchPlaceHolder: {
            name: 'Tên',
            status: 'Chọn trạng thái',
        },
        table: {
            name: 'Tên',
            description: 'Mô tả'
        },
        form: {
            label: {
                avatar: 'Ảnh đại diện',
                name: 'Tên chuyên ngành',
                description: 'Mô tả',
                status: 'Trạng thái',
            },
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    subjectListPage: {
        breadcrumbs: {
            currentPage: 'Môn học',
        },
        objectName: 'môn học',
        searchPlaceHolder: {
            name: 'Tên',
            status: 'Chọn trạng thái',
            code: 'Mã môn'
        },
        table: {
            name: 'Tên',
            description: 'Mô tả',
            code: 'Mã môn'
        },
        form: {
            label: {
                name: 'Tên môn',
                description: 'Mô tả',
                code: 'Mã môn',
                status: 'Trạng thái',
            },
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    provinceListPage: {
        breadcrumbs: {
            currentPage: 'Tỉnh thành',
        },
        objectName: 'tỉnh thành',
        searchPlaceHolder: {
            name: 'Tên',
            status: 'Chọn trạng thái',
        },
        table: {
            name: 'Tên',
        },
        modal: {
            provinceNameLabel: 'Tên {{ var, lowercase }}',
            provinceNamePlaceholder: 'Vui lòng nhập {{ var, lowercase }}',
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    teacherListPage: {
        breadcrumbs: {
            currentPage: 'Giảng viên',
        },
        objectName: 'giảng viên',
        searchPlaceHolder: {
            name: 'Tên',
            status: 'Chọn trạng thái',
        },
        table: {
            fullName: 'Họ và tên',
            username: "Tên tài khoản",
            phone: "Số điện thoại",
            email: "Email",
            degree: "Học vị",
            status: "Trạng thái",
            subject: 'Môn học',
            subjectConfig: 'Quản lý'
        },
        form:{
            label:{
                avatar:"Ảnh đại diện",
                fullName: 'Họ và tên',
                username: "Tên tài khoản",
                phone: "Số điện thoại",
                email: "Email",
                degree: "Học vị",
                status: "Trạng thái",
                password: "Mật khẩu",
                newPassword: 'Mật khẩu mới',
                birthDay: 'Ngày sinh',
                address: 'Địa chỉ',
                province: 'Tỉnh thành',
                district: 'Quận, huyện',
                commune: 'Phường, xã',
                newpassword: 'Mật khẩu mới',
                typeNewPasswordAgain: 'Nhập lại mật khẩu mới'
            },
            placeholder: {
                birthDay: 'Ngày sinh'
            }
        },
        modal: {
            provinceNameLabel: 'Tên {{ var, lowercase }}',
            provinceNamePlaceholder: 'Vui lòng nhập {{ var, lowercase }}',
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    studentListPage: {
        breadcrumbs: {
            currentPage: 'Sinh viên',
        },
        objectName: 'Sinh viên',
        searchPlaceHolder: {
            name: 'Tên',
            status: 'Chọn trạng thái',
        },
        table: {
            fullName: 'Họ và tên',
            username: "Tên tài khoản",
            phone: "Số điện thoại",
            email: "Email",
            major: "Chuyên ngành",
            status: "Trạng thái",
        },
        form:{
            label:{
                avatar:"Ảnh đại diện",
                fullName: 'Họ và tên',
                username: "Tên tài khoản",
                phone: "Số điện thoại",
                email: "Email",
                major: "Chuyên ngành",
                status: "Trạng thái",
                password: "Mật khẩu",
                newPassword: 'Mật khẩu mới',
                birthDay: 'Ngày sinh',
                address: 'Địa chỉ',
                province: 'Tỉnh thành',
                district: 'Quận, huyện',
                commune: 'Phường, xã',
                admissionYear: 'Năm nhập học',
                newpassword: 'Mật khẩu mới',
                typeNewPasswordAgain: 'Nhập lại mật khẩu mới'
            },
            placeholder: {
                birthDay: 'Ngày sinh'
            }
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    teacherSubjectListPage: {
        breadcrumbs: {
            parentPage: 'Giảng viên',
            currentPage: 'Môn học phụ trách',
        },
        objectName: 'môn học',
        searchPlaceHolder: {
            name: 'Tên',
            status: 'Chọn trạng thái',
        },
        table: {
            code: 'Mã môn học',
            name: 'Tên môn học',
            description: 'Mô tả',
            back: 'Trở về',
            subjectList: 'Danh sách môn học',
            teacherSubject: 'Môn học của tôi',
            searchPlaceHolder: 'Tìm tại đây',
            subject: 'môn học',
            delete: 'Xóa',
            selectAll: 'Chọn tất cả',
            selectCurrent: 'Chọn hiện tại',
            selectInvert: 'Chọn ngược lại',
            removeAll: 'Xóa tất cả',
            removeCurrent: 'Xóa hiện tại',
        },
        form:{
            titleAdd: "Thêm môn học",   
            label:{
                titleAdd: "THÊM SẢN PHẨM",
                subjectName: 'Môn học',
                status: 'Trạng thái'
            },
        },
        createPage: {
            confirmDelete: 'Xóa môn học này',
            confirmAdd: 'Thêm môn học này',
            yes: 'Có',
            no: 'Không',
        },
        editButton: 'Chỉnh sửa môn học',
        showSuccessMessage: {
            add: 'Thêm môn học thành công!',
            delete: 'Xóa thành công!',
        },
        showErrorMessage: {
            add: 'Đã xảy ra lỗi!',
        }
    },
    syllabusListPage: {
        breadcrumbs: {
            currentParentPage: 'Môn học',
            currentPage: 'Giáo án',
        },
        objectName: 'giáo án',
        searchPlaceHolder: {
            title: 'Tiêu đề',
        },
        table: {
            title: 'Tiêu đề'
        },
        form:{
            label:{
               avatar: 'Hình đại diện',
               title: 'Tiêu đề',
               description: 'Mô tả'
            },
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    chapterListPage: {
        breadcrumbs: {
            teacherSubjectPage: 'Môn học',
            syllabusPage: 'Giáo án',
            currentPage: 'Chương > Bài học',
        },
        objectName: 'chương',
        objectNameLesson: 'bài học',
        searchPlaceHolder: {
            title: 'Chương',
        },
        table: {
            title: 'Chương',
        },
        tableChild: {
            title: 'Tiêu đề',
            order: 'Thứ tự'
        },
        form:{
            label:{
               avatar: 'Hình đại diện',
               title: 'Tiêu đề',
               description: 'Mô tả',
               order: 'Số thứ tự',
               attachment: 'Tệp đính kèm',
               content: 'Nội dung',
            },
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
        requestLessonFailed: 'Đã xảy ra lỗi, vui lòng thử lại!',
        lessonModalTitle: 'bài học'
    },
    classListPage: {
        breadcrumbs: {
            currentPage: 'Lớp học',
        },
        objectName: 'lớp học',
        searchPlaceHolder: {
            title: 'Tên lớp',
            status: 'Trạng thái'
        },
        table: {
            title: 'Tên lớp',
            teacher: 'Giảng viên phụ trách',
            subject: 'Tên môn'
        },
        form:{
            label:{
               avatar: 'Hình đại diện',
               title: 'Tên lớp',
               description: 'Mô tả',
               teacher: 'Giảng viên',
               subject: 'Môn học',
            },
        },
        placeholder:{
            description: 'Vui lòng nhập mô tả',
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
    },
    studentClassListPage: {
        breadcrumbs: {
            currentParentPage: 'Lớp học',
            currentPage: 'Sinh viên trong lớp',
        },
        objectName: 'sinh viên',
        searchPlaceHolder: {
            fullName: 'Họ và tên',
            status: 'Trạng thái'
        },
        table: {
            fullName: 'Họ và tên',
            username: "Tên tài khoản",
            phone: "Số điện thoại",
            email: "Email",
            major: "Chuyên ngành",
            status: "Trạng thái",
            back: 'Trở về',
            studentList: 'Danh sách sinh viên',
            studentClass: 'Sinh viên trong lớp',
            searchPlaceHolder: 'Tìm tại đây',
            student: 'sinh viên',
            delete: 'Xóa',
            selectAll: 'Chọn tất cả',
            selectCurrent: 'Chọn hiện tại',
            selectInvert: 'Chọn ngược lại',
            removeAll: 'Xóa tất cả',
            removeCurrent: 'Xóa hiện tại',
        },
        form:{
            titleAdd: "Chỉnh sửa sinh viên",
            label:{
                titleAdd: "THÊM SINH VIÊN",
                studentName: 'Sinh viên',
                status: 'Trạng thái'
            },
        },
        createPage: {
            confirmDelete: 'Xóa sinh viên này',
            confirmAdd: 'Thêm sinh viên này',
            yes: 'Có',
            no: 'Không',
        },
        placeholder:{
            description: 'Vui lòng nhập mô tả',
        },
        showSuccessMessage: {
            add: 'Thêm sinh viên thành công!',
            delete: 'Xóa sinh viên thành công!',
        },
        createNewButton: 'Chỉnh sửa {{ var, lowercase }} sinh viên',
    },
    assignmentListPage: {
        breadcrumbs: {
            teacherSubjectPage: 'Môn học',
            syllabusPage: 'Giáo án',
            chapterPage: 'Chương',
            currentPage: 'Bài kiểm tra'
        },
        objectName: 'bài kiểm tra',
        table: {
            title: 'Tiêu đề',
            type: 'Loại bài kiểm tra',
            createdDate: 'Ngày tạo',
        },
        searchPlaceHolder: {
            title: 'Tiêu đề bài kiểm tra',
            type: 'Loại bài kiểm tra',
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
        form: {
            label: {
                title: 'Tiêu đề',
                type: 'Loại bài kiểm tra',
                description: 'Mô tả',
            }
        }
    },
    questionListPage: {
        breadcrumbs: {
            teacherSubjectPage: 'Môn học',
            syllabusPage: 'Giáo án',
            assignmentPage: 'Bài kiểm tra',
            currentPage: 'Câu hỏi'
        },
        objectName: 'câu hỏi',
        table: {
            content: 'Nội dung',
            type: 'Loại câu hỏi',
        },
        searchPlaceHolder: {
            content: 'Nội dung',
            type: 'Loại câu hỏi',
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
        form: {
            label: {
                content: 'Câu hỏi',
                type: 'Loại câu hỏi',
                answer: 'Đáp án',
                point: 'Điểm số'
            }
        }
    },
    questionEssayListPage: {
        breadcrumbs: {
            teacherSubjectPage: 'Môn học',
            syllabusPage: 'Giáo án',
            assignmentPage: 'Bài kiểm tra',
            currentPage: 'Câu hỏi'
        },
        objectName: 'câu hỏi',
        table: {
            question: 'Câu hỏi',
            content: 'Nội dung',
            type: 'Loại câu hỏi',
        },
        searchPlaceHolder: {
            content: 'Nội dung câu hỏi',
            type: 'Loại câu hỏi',
        },
        createNewButton: 'Tạo {{ var, lowercase }} mới',
        form: {
            label: {
                content: 'Nội dung câu hỏi',
                type: 'Loại câu hỏi',
                answer: 'Câu trả lời',
                point: 'Điểm số'
            }
        }
    }
}
