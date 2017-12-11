/**
 * Created by tanxinzheng on 17/12/11.
 */
export default {
  loginHandler: function (token) {
    window.localStorage.setItem('token', token)
    window.location.href = '/'
  },
  logout: function () {
    localStorage.removeItem('token')
    this.redirectLoginPage()
  },
  isAuthenticated: function () {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/login.html'
      return false
    }
    return true
  },
  redirectLoginPage: function () {
    window.location.href = '/login.html'
  }
}
