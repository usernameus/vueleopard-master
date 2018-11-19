const getters = {
  sidebar: state => state.app.sidebar,
  userInfo: state => state.user.userInfo,
  permission_routers: state =>state.app.routers,
  top_routers: state =>state.app.topRoutes,
}
export default getters
