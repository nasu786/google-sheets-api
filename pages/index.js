/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { GoogleSpreadsheet } from "google-spreadsheet";
import axios from 'axios';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [submitLoader, setSubmitLoader] = useState("");
  const [sucess, setSuccess] = useState(false);

  // submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitLoader(true)
    setSuccess("")

    // const options = {
    //   method: 'POST',
    //   headers: {
    //     accept: 'application/json',
    //    'content-type': 'application/json',
    //    'api-key': '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',
    //  },
    //  body: JSON.stringify({"email" : email, "attributes" : {"FIRSTNAME" : "firstname" , "LASTNAME" : "lastname" , "SMS" : `915646575645`}, listIds: [2]})
    //  };

    //  fetch('https://api.sendinblue.com/v3/contacts', options)
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(err => console.error(err));


    const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
    const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
    const CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
    const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDLDrBhAh91vNj9\n8VPZIxenSqFPDNQObwoLfoH92iERTQNDHLRQO+TjHwRIieaDCk+gzUvuF+7S6BVP\nmClGXY5+niJncwb6xZhahZRYukeWCTQUg6jDlOOlg3JSLiNuw0UAgNJfwsR8PNrT\nea+5YcXw7OURL8OTat0d/+sTwK7Q7pxqlFVkLvpyfJOlpAO8SNcraUaodiaOlhra\nbNgEXQNXEhdJ8e2PBLzg7jMSrFp/ZRV4L42Bzw+7O+7K6aMEjwfrSfDHeVeGJ7lN\nCBjY181/IgPp56mDtpI7MIwSq/x2I2dYZEc/tHvdfoOGzOgA2sw2Hd2KsdFgfh1Z\n/G87FAYLAgMBAAECggEAIayvcn8MIZXudHqzmZR4xT0asEXj2vruMwbJXwRwLHLV\noikd/BpatJG9v5vi9wNcPkIdoAAnEqH7esY0vh8g1P27neVVGHxxbj2t4uMNoSOo\nl+hXsgu8jwPUDy3ooWNPy6wRd2EQ/buH3L9W9Yrx7SkUOfvuVsHHpsR8wztWon5L\n3wmiCHtiB6eICRtbnPwmcyjcWRu858lOFHcX03gVnugnQZXfhN8ferocpFN3gm5G\nbMwSLP1IlDyOnbe6oJ5nDAtsS6eWvDVMwcpC/cs77NA8hdZNwa7ZsZDcbH7mNAzA\n2GSYxj+aGpF2kNKXtwA4z0wXLLmsL+T0LZ3m4r8kKQKBgQD3x+GytiNpwR6filfi\n1wHyhtB9okkQllLI4MigwJT5PNtZAFqkTl8jzMURwAnakLxdYrZ/R32l4OjGVGmm\nRAswPuABVBTURdJe76sDY6nZ2G9JM4MjadcyohsRt5yiWAny7amgE/PBhQy0ovd3\nrYK9EnELMOqyHf6VCtsh2fXuqQKBgQDRywXN1yZAgFZXTWZf5TM3DVvrtWUD5CqL\nUtNma0W2G6HmWQQXwlhm+HJmIFsEKybPBimkktME+yUBwbZmwwLU5TQ2NMCu7P9Y\nYk9ANR5FbjwUEGLQXjyFl9KMcuOqdmfSiVbceltCairoExd78omKF6coVAi/GQQG\nE170opADkwKBgA28Td2rTSFCrGDpuV+AzcHVCV+9jFFYE/TAyT5oDpoWbo5rf5rW\nIV4Jru8B90nfdiGzJCzAGM4GPsEn0sd9xCUDh0VrlNADotrSbGd+sd66qcikC2P+\nLQjIhbmgtRUmzj5iQGH4WS3kI0UsN42x16qFiDC3oHsJQKCgfm9M9t4pAoGAUiKE\nITSMe1BDfWaGICEhzfni9QNNixp3NZi1vzFcV5G17vMG0S57YcT/NNCSEa27Qe4N\nu6roBtk0gd2PRegvYZ5itJ4umc2bosTKdj7VnSUtTEWmCiH62+q2udn5HDHDMAAp\nC6SzuerK5ZUj6pjoFDJydS2BRx/KHX7T/D7w1xUCgYAkb+9qKBC6+6m83YXgESgn\nB2Lu3ANQ7cu3rPQh8t5qxDEZcb69QG4F9Tq5grTnDiFD5KCoSH5C0asgPHzVhxQJ\nKWbHmgIaTtSx2faeIO6Gqvi+g3NcfY0Qu6Md8G3+QhdWsiM/K7pDKE4luDnOyg+M\ncihVjHSZ9BeEvGPftdE/0g==\n-----END PRIVATE KEY-----\n"

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const appendSpreadsheet = async (row) => {
      try {
        await doc.useServiceAccountAuth({
          client_email: CLIENT_EMAIL,
          private_key: PRIVATE_KEY
        });
        // loads document properties and worksheets
        await doc.loadInfo();

        const sheet = doc.sheetsById[SHEET_ID];
        const rows = await sheet.getRows()
        if (rows.every(item => item.Email !== email && item.MobileNumber !== mobileNumber)) {
          await sheet.addRow(row);
          setSubmitLoader(false);
          setSuccess("Form has been Updated Successfully.");
        } else {
          setSubmitLoader(false);
          setSuccess(`Email or Mobile Number already exists!.`);
          console.log(rows.every(item => item.Email === email), rows.every(item => item.mobileNumber === mobileNumber))
        }
      } catch (e) {
        console.error("Error: ", e);
      }
    };

    const create = async () => {
      const newSheet = await doc.addSheet({ title: 'Timesheet' });
      console.log(newSheet)
    }

    create();
    
    appendSpreadsheet({ Name: name, Email: email, MobileNumber: mobileNumber})
  }


  return (
    <div className="container">
      <div className='row justify-content-md-center mt-5'>
        <div style={{ width: "60%" }}>
          <h4 className='text-center'>Save Form Data in Google Sheets</h4>
          <br></br>
          <form autoComplete="off" className='form-group'
            onSubmit={handleSubmit}>
            <label>Name</label>
            <input type='text' className='form-control' required
              placeholder='Enter your name' onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <br></br>
            <label>Email</label>
            <input type='text' className='form-control' required
              placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <br></br>
            <label>Mobile Number</label>
            <input type='text' className='form-control' required
              placeholder='Enter your mobile number'
              onChange={(e) => setMobileNumber(e.target.value)}
              value={mobileNumber}
            />
            <br></br>
            <div className='text-center'>
              <button type='submit' className='btn btn-success'>Submit</button>
              {submitLoader && (
                <div className="blog-loader" style={{ marginTop: '20px' }}>
                  <img
                    src="https://global-s3.s3.us-west-2.amazonaws.com/form_submission_loader_4e6da65542.gif"
                    alt="loader-icon"
                    width="30px"
                  />
                </div>
              )}
              {sucess && (
                <div className={sucess.includes("exists")? "text-danger" : "text-success"} style={{ marginTop: `5px` }}>
                  {sucess}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
