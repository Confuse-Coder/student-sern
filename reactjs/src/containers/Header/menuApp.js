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
        // subMenus: [
        //   { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //   { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        // ],
      },
      {
        name: 'menu.admin.manage-admin',
        link: '/system/user-admin',
      },
      {
        //quản lý kế hoạch giảng dạy của giảng viên
        name: 'menu.teacher.manage-schedule',
        link: '/teacher/manage-schedule',
      },
    ],
  },
  {
    //quản lý phòng khám
    name: 'menu.admin.teaching-center',
    menus: [
      {
        name: 'menu.admin.manage-teaching-center',
        link: '/system/manage-teaching-center',
      },
    ],
  },
  {
    //quản lý chuyên khoa
    name: 'menu.admin.specialty',
    menus: [
      {
        name: 'menu.admin.manage-specialty',
        link: '/system/manage-specialty',
      },
    ],
  },
];
