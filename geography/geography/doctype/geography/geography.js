// Copyright (c) 2025, dev_priyanshu and contributors
// For license information, please see license.txt

frappe.ui.form.on("Geography", {

    // onload_post_render(frm) {
	// 	if (!frm.doc.phone) {
	// 		frm.set_value("phone", "+91 ");
	// 		setTimeout(() => {
	// 			frm.fields_dict.phone?.$input?.focus();
	// 		}, 100);
	// 	}
	// },

    onload(frm) {
		frm.set_df_property(
			"dob",                  
			"max_date",       
            new Date()		);

        if (frm.is_new() && !frm.doc.phone_number) {
            frm.set_value("phone_number", "+91 ");
        }
	},
    before_save(frm){
        let email = frm.doc.email || "";
        if (email && email.split("@").length !== 2){
            frappe.throw("Invalid your email please fill now valid email");   
        } 
    },
    dob(frm){
        if(!frm.doc.dob)return

        let today = new Date();
        let dob = new Date(frm.doc.dob);

        let Year = today.getFullYear() - dob.getFullYear();
        let Month = today.getMonth() - dob.getMonth();
        let Day = today.getDate() - dob.getDate();

        if(Day < 0){
            Month--;
            let prevMonth = new Date(today.getFullYear(), today.getMonth(),0);
            Day += prevMonth.getDate();

        }
        if(Month < 0){
            Year--;
            Month += 12;
        }

        frm.set_value("year", Year);
        frm.set_value("month", Month);
        frm.set_value("day", Day)
    },
    onload_post_render(frm) {
        const input = frm.fields_dict.phone_number?.$input;
        if (input && !input.val()) {
            input.val("+91 ");
            frm.doc.phone_number = "+91 ";
        }
    },
    refresh(frm) {
     
        let first = frm.doc.first_name || "";
        let last = frm.doc.last_name || "";
        frm.set_value("full_name", (first + " " + last).trim()),

        frm.set_query("state", () => ({filters: {country: frm.doc.country || "pls select country"}}));
        frm.set_query("district", () => ({filters: {state: frm.doc.state || "pls select State"}}));
        frm.set_query("block", () => ({filters: {district: frm.doc.district || "pls select District"}}));
        frm.set_query("gram_panchayat", () => ({filters: {block: frm.doc.block || "pls select Block"}}));
        frm.set_query("village", () => ({filters: {gram_panchayat: frm.doc.gram_panchayat || "pls select Gram_panchayat"}}));
        frm.set_query("hamlet", () => ({filters: {village: frm.doc.village || "pls select Village"}}));
	},
    
    country(frm){
        frm.set_value("state", "");
        frm.set_value("district", "");
        frm.set_value("block", "");
        frm.set_value("gram_panchayat", "");
        frm.set_value("village", "");
        frm.set_value("hamlet", "");
    },

    state(frm){
        frm.set_value("district", "");
        frm.set_value("block", "");
        frm.set_value("gram_panchayat", "");
        frm.set_value("village", "");
        frm.set_value("hamlet", "");
    },

    district(frm){
        frm.set_value("block", "");
        frm.set_value("gram_panchayat", "");
        frm.set_value("village", "");
        frm.set_value("hamlet", "");
    },
    block(frm){
        frm.set_value("gram_panchayat", "");
        frm.set_value("village", "");
        frm.set_value("hamlet", "");
    },
    gram_panchayat(frm){
        frm.set_value("village", "");
        frm.set_value("hamlet", "");
    },
    village(frm){
        frm.set_value("hamlet", "");   
    },

  

});
