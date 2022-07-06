export const adminMenu = [
  {
    //quản lý người dùng
    name: 'menu.admin.manage-user',
    menus: [
      {
        name: 'menu.admin.crud',
        link: '/system/user-manage',
      },
      {
        name: 'menu.admin.crud-redux',
        link: '/system/user-redux',
      },
      {
        name: 'menu.admin.manage-teacher',
        link: '/system/manage-teacher',
      },
      {
        //quản lý kế hoạch dạy học của giảng viên
        name: 'menu.teacher.manage-schedule',
        link: '/teacher/manage-schedule',
      },
    ],
  },
  {
    //quản lý trung tâm
    name: 'menu.admin.teaching-center',
    menus: [
      {
        name: 'menu.admin.manage-teaching-center',
        link: '/system/manage-teaching-center',
      },
    ],
  },
  {
    //quản lý chuyên ngành
    name: 'menu.admin.specialty',
    menus: [
      {
        name: 'menu.admin.manage-specialty',
        link: '/system/manage-specialty',
      },
    ],
  },
];

export const teacherMenu = [
  {
    name: 'menu.admin.manage-user',
    menus: [
      {
        //quản lý kế hoạch dạy học của giảng viên

        name: 'menu.teacher.manage-schedule',
        link: '/teacher/manage-schedule',
      },
      {
        //quản lý lịch học của giảng viên

        name: 'menu.teacher.manage-student',
        link: '/teacher/manage-student',
      },
    ],
  },
];
