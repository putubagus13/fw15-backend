const admin = require("express").Router()

admin.use("/users", require("./admin/users.router"))
admin.use("/profile", require("./admin/profile.router"))
admin.use("/categories", require("./admin/categories.router"))
admin.use("/event", require("./admin/event.router"))
admin.use("/eventCategories", require("./admin/eventCategories.router"))
admin.use("/cities", require("./admin/cities.router"))

module.exports = admin
