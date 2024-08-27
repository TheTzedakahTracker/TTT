export default function MakeDonation () {
    return (


        <form className="donation">
       
        <h3>DONATE</h3>
        

          <div className="col-md-2">
          Donation Amount <input id="dAmount" name="dAmount" type="text" placeholder="Enter Amount" className="form-control input-md" required=""/>    
          </div>

        
        <div className="form-group">
          <label className="col-md-4 control-label" for="Add an Institution">Add New Charity</label>
          <div className="col-md-4">
            <div className="input-group">
              <input id="Add an Institution" name="Add an Institution" className="form-control" placeholder="Tzedakah Name" type="text"/>
              <span className="input-group-addon">add Charity</span>
            </div>
          </div>
        </div>

        
        <div className="form-group">
          <label className="col-md-4 control-label" for="selectone">Select an Organization</label>
          <div className="col-md-4">
            <select id="selectone" name="selectone" className="form-control" multiple="multiple">
              <option value="1">Charity 1</option>
              <option value="2">Charity2</option>
            </select>
          </div>
        </div>
        

        <div className="form-group">
          <div className="col-md-4">
          <label className="col-md-4 control-label" for="donateOnce">One Time Tzedakah</label>
          <input id="donateOnce" name="donateOnce" type="text" placeholder="one time donation" className="form-control input-md"/> 
          </div>
        </div>
        

        <div className="form-group">
          <div className="col-md-4">
            <button id="singlebutton" name="singlebutton" className="btn btn-primary">Donate</button>
          </div>
        </div>
        

        </form>
        

        
    );//end return
} 