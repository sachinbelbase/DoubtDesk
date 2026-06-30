function Navbar() {

     return (
          <div className=" navbar h-16 bg-white shadow flex items-center justify-between px-6 ">
               <input
                    type="text"
                    className="border rounded-lg px-4 py-2 w-96"
                    placeholder="Search doubts..."
               />

               <div className="profile flex gap-5">

                    <span>🔔</span>

                    <span>👤 Student</span>

               </div>

          </div>
     )
}

export default Navbar;