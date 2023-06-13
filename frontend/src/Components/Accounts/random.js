<label htmlFor="debit-account">Debit Account:</label>

<select required id="accountnames" name="debitAccount"  onChange={handleChange}  disabled={updating} style={{ fontSize: "18px", textAlign: "left" }}>
{accountnames.map(item =>(
<option key={item} value={item}>{item}</option>
))} 

</select>
      .then(response=>{
        if(!response.ok){
          throw new Error ("Response was not ok");}
          const contentType=response.headers.get('content-type');
          if(contentType &&contentType.includes('application/json')){
            return console.log("Yes");
          }else{
            throw new TypeError('Response was not json');
          }
        })
        <div className="form-row">
        {accountnames.map(item => <div key={item}>{item}</div>)}
   
       </div>





const getaccountNames=()=>{
   
  accountnames.map((account)=>{
   return<option value={account.name}>{account.name}</option>;
  });
 
};
