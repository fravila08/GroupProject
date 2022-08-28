import {useState, useEffect} from 'react';
import { Modal } from 'react-bootstrap';
import { MDBModalBody,
  MDBInput,
  MDBBtn,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';
import 'react-bootstrap-icons';
import {FaCompress} from 'react-icons/fa';
import {BsGear} from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';

export default function CommentForm({title, setTitle, handleTitleEntry, text, setText, handleSubmit, submitLabel}) {
  const [lgShow, setLgShow] = useState(false);

  const handleClick = () => {
    console.log('called');
    handleSubmit(text);
    toggleCommentModal();
    setTitle('');
    setText('');
  }

  useEffect(() => {
    if(lgShow) {
      console.log('showing modal');
    } else {
      setTitle('');
      setText('');
    }
  }, [lgShow]);

  const toggleCommentModal = () => {
    setLgShow(!lgShow);
  };

  return (
      <div class="bg-white bg-surface-50 text-basicSurface-500 shadow flex flex-col justify-between sm:rounded-lg block-post-composer">
        <div class="flex-1 px-4 py-5 sm:p-6 flex space-x-4 items-center">
          <a class="cursor-pointer transition duration-100 ease-in-out text-actionAccent-600 hover:text-actionAccentHover-500 flex-shrink-0 hover:opacity-90 h-12 w-12" href="/member/DcCEolocve">
            <span class="inline-flex relative items-center justify-center flex-shrink-0 bg-surface-200 rounded-full h-12 w-12">
              <span class="text-lg font-medium leading-none text-basicSurface-500">
                g
              </span>
            </span>
          </a>
          <button onClick={toggleCommentModal} type="button" class="bg-surface-100 hover:bg-surface-200 text-basicSurface-500 rounded-md p-2 px-3 h-10 flex-grow text-left">Say what's on your mind</button>
          <Modal
            show={lgShow}
            onHide={() => setLgShow(false)}
          >
            <div className="p-4">
              <div class="flex flex-row justify-content-between"><h4 >Create post</h4><div class="d-flex space-x-1 align-self-center"> 
                <button class="btn bg-light">
                  <BsGear />
                </button>
                <button class="btn bg-light">
                  <FaCompress /> 
                </button>            
                <button onClick={toggleCommentModal} class="btn bg-light">
                  <GrClose />
                </button>
              </div>  
            </div> 
            </div>
              <MDBModalBody className="py-0">
                <div className="mx-3 grey-text flex flex-col overflow-hidden" >
                  <input id="comment-title" class="block text-2xl w-full mt-2 py-2 bg-transparent appearance-none focus:outline-none text-basicSurface-500 placeholder-basicSurface-300/75" value={title} onChange={handleTitleEntry} placeholder="Post title"></input>
                  <textarea class="resize-none focus:outline-0 form-control textarea add-comment" id="comment-form-textarea" value={text} placeholder="What are your thoughts?" onChange={(e) => setText(e.target.value)}></textarea>
                </div>
                <MDBModalFooter className="border-0">
                  <MDBBtn onClick={handleClick} color="info" type="submit" class="btn btn-primary btn-block mb-4 comment-form-button">
                    Publish
                  </MDBBtn>
                </MDBModalFooter>  
              </MDBModalBody>
          </Modal>
      </div>
    </div>
  )
};
