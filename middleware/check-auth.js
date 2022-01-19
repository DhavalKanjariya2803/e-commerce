export default function (context) {
//   console.log()
  if (!context.$auth.$state.loggedIn) {
    context.redirect('/login')
  }
}
