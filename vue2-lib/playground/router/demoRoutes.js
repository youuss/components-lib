export default [
  
  {
    path: '/layout',
    meta: {"title":"Layout","zh":"表格页面布局","process":60},
    component: () => import('../../examples/layout/layout.md'),
  },
  {
    path: '/tablePanel',
    meta: {"title":"TablePanel","zh":"列表Panel","process":60},
    component: () => import('../../examples/tablePanel/tablePanel.md'),
  }
];