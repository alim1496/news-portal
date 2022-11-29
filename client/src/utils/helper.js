const months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

const dates = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const roles = ["", "User", "Author", "Editor", "Admin"];

export const parseDate = (date) => {
    try {
        const d = date.split("T")[0];
        const parts = d.split("-");
        const bn_month = months[parseInt(parts[1])-1];
        const bn_date = toBangla(parts[2]);
        const bn_year = toBangla(parts[0]);
        return bn_date + " " + bn_month + ", " + bn_year;
    } catch(e) {
        return "";
    }
    
};

export const parseToday = () => {
    try {
        const d = new Date();
        const bn_month = months[d.getMonth()];
        const bn_date = toBangla(d.getDate().toString());
        const bn_year = toBangla(d.getFullYear().toString());
        return bn_date + " " + bn_month + ", " + bn_year;
    } catch(e) {
        return "";
    }
    
};

const toBangla = (eng) => {
    let bang = "";
    for(let i=0;i<eng.length;i++) {
        bang += dates[eng[i]];
    }
    return bang;
};

export const slugify = (url) => {
    url = url.replaceAll(",", "");
    url = url.replaceAll(";", "");
    url = url.replaceAll(":", "");
    url = url.replaceAll(" ", "-");
    return url;
}