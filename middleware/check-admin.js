export default function (context) {
  if (!context.$auth.$state.user.isAdmin) {
    context.redirect('/')
  }
}
