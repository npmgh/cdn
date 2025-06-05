        window.onload = function() {new Vue({el: "#app", data, methods, });}

        async function getPM25Tambon(id) {
          let results = {}, data = [];
          const resPM25 = pm25 => {
            let getLevel = '';
            let getDescription = '';
            let getPeople = '';
            if (pm25 > 75.0) {
              getLevel = 'คุณภาพอากาศอยู่ในเกณฑ์มีผลกระทบต่อสุขภาพ (สีแดง)';
              getDescription = '75.1 ไมโครกรัมต่อลูกบาศก์เมตร (µg/m³) ขึ้นไป';
              getPeople = 'ประชาชนทุกคน\n - งดกิจกรรมกลางแจ้ง\n - หากมีความจำเป็นต้องทำกิจกรรมกลางแจ้งให้ใช้อุปกรณ์ป้องกันตนเองทุกครั้ง เช่น หน้ากากป้องกัน PM2.5\n - หากมีอาการผิดปกติให้รีบไปพบแพทย์\n - ผู้ที่มีโรคประจำตัว ควรอยู่ในพื้นที่ปลอดภัยจากมลพิษทางอากาศ ให้เตรียมยาและอุปกรณ์ที่จำเป็นให้พร้อมและปฏิบัติตามคำแนะนำของแพทย์อย่างเคร่งครัด';
            }
            else if (pm25 > 37.5) {
              getLevel = 'คุณภาพอากาศอยู่ในเกณฑ์เริ่มมีผลกระทบต่อสุขภาพ (สีส้ม)'
              getDescription = '37.6 - 75.0 ไมโครกรัมต่อลูกบาศก์เมตร (µg/m³)';
              getPeople = 'ประชาชนทั่วไป :\n - ใช้อุปกรณ์ป้องกันตนเอง เช่น หน้ากากป้องกัน PM2.5 ทุกครั้งที่ออกนอกอาคาร\n - จำกัดระยะเวลาในการทำกิจกรรมหรือการออกกำลังกายกลางแจ้งที่ใช้แรงมาก\n - ควรสังเกตอาการผิดปกติ เช่น ไอ หายใจลำบาก ระคายเคืองตา\n\n ประชาชนกลุ่มเสี่ยง :\n - ใช้อุปกรณ์ป้องกันตนเอง เช่น หน้ากากป้องกัน PM2.5 ทุกครั้งที่ออกนอกอาคาร\n - เลี่ยงการทำกิจกรรมหรือการออกกำลังกายกลางแจ้งที่ใช้แรงมาก\n - ให้ปฏิบัติตามคำแนะนำของแพทย์ หากมีอาการผิดปกติให้รีบไปพบแพทย์';
            }
            else if (pm25 > 25.0) {
              getLevel = 'คุณภาพอากาศอยู่ในเกณฑ์ปานกลาง (สีเหลือง)';
              getDescription = '25.1 - 37.5 ไมโครกรัมต่อลูกบาศก์เมตร (µg/m³)';
              getPeople = 'ประชาชนทั่วไป :\n ลดระยะเวลาการทำกิจกรรมหรือการออกกำลังกายกลางแจ้งที่ใช้แรงมาก\n\n  ประชาชนกลุ่มเสี่ยง :\n - ใช้อุปกรณ์ป้องกันตนเอง เช่น หน้ากากป้องกัน PM2.5 ทุกครั้ง ที่ออกนอกอาคาร\n - ลดระยะเวลาการทำกิจกรรมหรือการออกกำลังกายกลางแจ้งที่ใช้แรงมาก\n - หากมีอาการผิดปกติให้รีบปรึกษาแพทย์';
            }
            else if (pm25 > 15.0) {
              getLevel = 'คุณภาพอากาศอยู่ในเกณฑ์ดี (สีเขียว)';
              getDescription = '15.1 - 25.0 ไมโครกรัมต่อลูกบาศก์เมตร (µg/m³)';
              getPeople = 'ประชาชนทั่วไป :\n สามารถทำกิจกรรมกลางแจ้งได้ตามปกติ\n\n ประชาชนกลุ่มเสี่ยง :\n ควรสังเกตอาการผิดปกติ เช่น ไอบ่อย หายใจลำบาก หายใจถี่ หายใจไม่ออก หายใจมีเสียงวี้ด แน่นหน้าอก เจ็บหน้าอก ใจสั่น คลื่นไส้ เมื่อยล้าผิดปกติ หรือ วิงเวียนศีรษะ';
            }
            else if (pm25 <= 15.0) {
              getLevel = 'คุณภาพอากาศอยู่ในเกณฑ์ดีมาก (สีฟ้า)';
              getDescription = '0 - 15.0 ไมโครกรัมต่อลูกบาศก์เมตร (µg/m³)';
              getPeople = 'ประชาชนทุกคนสามารถดำเนินชีวิตได้ตามปกติ';
            }
            return {pm25, getLevel, getDescription, getPeople};
          }
          const responsePM25Amphoe = await fetch("https://pm25.gistda.or.th/rest/getPm25byAmphoePred3?pv_idn=31");
          const jsonPM25Amphoe = await responsePM25Amphoe.json();
          const dataPM25Amphoe = jsonPM25Amphoe.data;
          for (let index = 0; index < dataPM25Amphoe.length; index++) {
            const r = dataPM25Amphoe;
            if (id == r[index].ap_idn) {
              const pm25Avg24hr = r[index].pm25Avg24hr;
              const pm25Avg24hr_ap_tn = pm25Avg24hr.toFixed(1);
              results.dataPM25Amphoe = resPM25(pm25Avg24hr_ap_tn);
              results.district = r[index].ap_tn;
            }
          };
          const responsePM25Tambon = await fetch("https://pm25.gistda.or.th/rest/getPm25byTambonPred3?ap_idn="+id);
          const jsonPM25Tambon = await responsePM25Tambon.json();
          const dataPM25Tambon = jsonPM25Tambon.data;
          for (let index = 0; index < dataPM25Tambon.length; index++) {
            const r = dataPM25Tambon;
            const pm25Avg24hr = r[index].pm25Avg24hr;
            const pm25Avg24hr_tb_tn = pm25Avg24hr.toFixed(1);
            const getData = resPM25(pm25Avg24hr_tb_tn);
            const tb_tn = r[index].tb_tn;
            data.push([tb_tn, getData.pm25, getData.getLevel]);
          };
          const output = {data: data, id: results.district, pm25: results.dataPM25Amphoe.pm25, level: results.dataPM25Amphoe.getLevel};
          console.log(output);
          return output;
        }
		
        let data = {
          message: null,
          submitting: false,
          title: "ฝุ่นละอองขนาดไม่เกิน 2.5 ไมครอน (PM2.5) จังหวัดบุรีรัมย์",
          titleSearchForm1: "กรุณาเลือกอำเภอ",
          titleSearchForm2: "ที่ต้องการดูข้อมูล PM2.5 รายตำบล",
          footer: "Copyright © 2019-present by Chatrawichai Chanprom | ลิขสิทธิ์และพัฒนาโดย นายชาติระวีไชย จันทร์พร้อม",
          showMain: true,
        };
		
        let methods = {
          submit: async function() {
            this.showMain = false;
            this.submitting = true;
            let results = document.getElementById("results");
                results.innerHTML = "";
            let info = document.getElementById("district");
            if (info.value == "0") {
              Swal.fire({
                icon: "error",
                title: "คำเตือน !!!",
                html: "<b>กรุณาเลือกอำเภอ</b><br /><br />",
                confirmButtonText:"<i class='fa fa-frown-o'></i>&nbsp; ปิดหน้าต่าง",
                timer: 60000,
                timerProgressBar: true,
                allowOutsideClick: false,
              });
              results.innerHTML = "";
              this.submitting = false;
              this.showMain = true;
            }
            else {
              Swal.fire({icon: 'info', title: 'กำลังประมวลผล กรุณารอสักครู่ !!!', timerProgressBar: true, allowOutsideClick: false, didOpen: () => {Swal.showLoading()}});
              try {
                const res = await getPM25Tambon(info.value);
                results.innerHTML = "";
                this.submitting = false;
                this.showMain = true;
                if (res.data && res.data !== undefined && res.data.length != 0) {
                  Swal.fire({
                    icon: "success",
                    title: "อำเภอ"+res.id,
                    html: "ค่า PM2.5 (µg/m³) : "+res.pm25+"<br>ระดับ PM2.5 : "+res.level+"<br><br>"+"<table class='table table-sm table-striped table-hover' id='dtable'></table>",
                    confirmButtonText:"<i class='fa fa-thumbs-o-up'></i>&nbsp; ปิดหน้าต่าง",
                    timerProgressBar: true,
                    allowOutsideClick: false,
                  });
                  $(document).ready(function() {
                    pdfMake.fonts = {
                      Roboto: {
                        normal: "Roboto-Regular.ttf",
                        bold: "Roboto-Medium.ttf",
                        italics: "Roboto-Italic.ttf",
                        bolditalics: "Roboto-MediumItalic.ttf",
                      },
                    }
                    $("#dtable").DataTable({
                      data: res.data,
                      dom: "Bfrtip",
                      buttons: ["excel", "pdf"],
                      responsive: true,
                      searching: false,
                      language: {
                        url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Thai.json",
                      },
                      columns: [
                        {"title" : "ตำบล"},
                        {"title" : "ค่า PM2.5 (µg/m³)"},
                        {"title" : "ระดับ PM2.5"},
                      ],
                    });
                  });
                }
              }
              catch (e) {
                this.submitting = false;
                this.message = {
                  type: "Error",
                  message: e.message,
                };
              }
            }
          },
          proData: async function() {
            this.submitting = true;
            let results = document.getElementById("results");
                results.innerHTML = "";
            $.LoadingOverlay("show");
            try {
              const scriptUrl = "https://script.google.com/macros/s/AKfycbxVC4IbBWWRyx08JeMLLKWFRlpkqzbd5sw7oX4WDg5lQE1tbK91qfy4GSTli7LW6WvQ/exec";
              const response = await fetch(scriptUrl+"?data=pm25");
              const json = await response.json();
              const res = json.data;
              console.log(res);
              $.LoadingOverlay("hide");
              this.submitting = false;
              results.innerHTML = "<a href='"+res.url+"'>"+res.name+"</a>";
            }
            catch (e) {
              this.submitting = false;
              this.message = {
                type: "Error",
                message: e.message,
              };
            }
          },
          closeMessageBox: function() {
            this.message = null;
          },
        };
		