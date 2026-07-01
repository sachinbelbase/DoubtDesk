import Button from "../common/Button";
const WelcomeBanner = () => {
     return (
          <div className="bg-blue-100 rounded-2xl p-8">
               <h1 className="text-3xl font-bold">
                    Welcome back, Anonymous!
               </h1>

               <p>
                    Ask freely, learn openly.
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