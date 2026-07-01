import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Button from "../../components/common/Button";

const AskQuestion = () => {
     return (
          <div>
               <h1>
                    Ask Question
               </h1>

               <Input
                    label="Title"
                    placeholder="Enter question" />

               <TextArea
                    label="Description"
                    placeholder="Explain your doubt"
               />

               <Button>
                    Post Question
               </Button>

          </div>
     )
}

export default AskQuestion;