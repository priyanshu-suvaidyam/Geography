# Copyright (c) 2025, dev_priyanshu and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Geography(Document):
    def validated(self):
        if self.dob and getdate(self.dob) > getdate(nowdate()):
            frappe.throw("Future date not allowed")
