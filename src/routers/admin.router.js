const admin = require("express").Router()

admin.use("/users", require("./admin/users.router"))
admin.use("/profile", require("./admin/profile.router"))
admin.use("/categories", require("./admin/categories.router"))
admin.use("/event", require("./admin/event.router"))
admin.use("/eventCategories", require("./admin/eventCategories.router"))
admin.use("/cities", require("./admin/cities.router"))
admin.use("/partners", require("./admin/partner.router"))
admin.use("/reservationSections", require("./admin/reservationSections.router"))
admin.use("/reservationStatus", require("./admin/reservationStatus.router"))
admin.use("/paymentMethod", require("./admin/paymentMethod.router"))
admin.use("/reservations", require("./admin/reservations.router"))
admin.use("/reservationTickets", require("./admin/reservationTickets.router"))
admin.use("/wishlists", require("./admin/wishlist.router"))

module.exports = admin
