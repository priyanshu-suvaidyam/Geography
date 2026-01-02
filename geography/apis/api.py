import frappe
from frappe.utils import add_days, nowdate

@frappe.whitelist()
def changeModuleOfDocType():
    cuttof_date = add_days(nowdate(), -22)

    source_module = "Geo Master"
    target_module = "Geography"

    doctypes = frappe.get_all(
        "DocType",
        filters={"module": source_module, "creation_date": ["<=", cuttof_date]},
        pluck="name"
    )

    for dt in doctypes:
        frappe.db.set_value("DocType", dt, "module", target_module)

    frappe.clear_cache()
