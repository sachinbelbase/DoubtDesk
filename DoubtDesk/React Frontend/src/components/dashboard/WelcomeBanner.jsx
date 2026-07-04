import Button from "../common/Button";
const WelcomeBanner = () => {
     return (
          <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6">
               <h1 className="text-3xl font-bold">
                    Welcome back, Anonymous!
               </h1>

               <p>
                    Ask questions anonymously and learn from the community.
               </p>

               <div className="mt-5">
                    <Button>
                         Ask Question
                    </Button>
               </div>
          </div>
     )
}

export default WelcomeBanner;