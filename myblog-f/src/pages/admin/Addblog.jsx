// import React, { useEffect,useRef, useState }  from 'react'
// import { blogCategories } from '../../assets/assets' 
// import { assets } from '../../assets/assets'
// import Quill from 'quill';
// import {useAppContext} from '../../context/appContext'
// import { toast } from 'react-hot-toast';

// const Addblog = () => {
//     const {axios}=useAppContext();
//     const[isAdding,setIsAdding]=useState(false); 

//     const editorRef=useRef(null);
//     const quillRef=useRef(null);

//     const[image,setImage]=useState(false);
//     const[title,setTitle]=useState('');
//     const[subtitle,setSubtitle]=useState('');
//     const[category,setCategory]=useState('');
//     const[isPublished,setIsPublished]=useState(false);

//     const onSubmitHandler=async (e)=>{
//       try{
//         e.preventDefault();
//         setIsAdding(true);
//         const blog={
//           title,
//           subtitle,
//           description:quillRef.current.root.innerHTML,
//           category,
//           isPublished
//         }
//         const formData=new FormData();
//         formData.append('blog',JSON.stringify(blog));
//         formData.append('image',image);
//         const {data}=await axios.post('/api/blogs',formData);

//         if(data.success){
//           toast.success(data.message);
//           setImage(false);
//           setTitle('');
//           setSubtitle('');
//           setCategory('Select a category');
//           setIsPublished(false);
//           quillRef.current.root.innerHTML='';
//         }else{
//           toast.error(data.message);
//         }
//       }catch(error){
//         console.log(error);
//       }
//       finally{
//         setIsAdding(false);
//       }
//     }
//     const generateContent=async()=>{

//     }
//     useEffect(()=>{
//       if(!quillRef.current && editorRef.current){
//         quillRef.current = new Quill(editorRef.current, {
//           theme: 'snow'
//         });
//       }
//     },[])

//   return (
//     <form  onSubmit={onSubmitHandler} className='flex-1 text-gray-600 h-full overflow-scroll bg-blue-50/50'>
//       <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
//         <p>Upload thumbnail</p>
//         <label htmlFor="image">
//           <img src={!image ? assets.upload : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
//           <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
//         </label>
//         <p className='mt-4'>
//           Blog Title </p>
//           <input 
//             type="text" 
//             placeholder='Type here...' 
//             requried
//             onChange={(e)=>setTitle(e.target.value)} 
//             value={title}
//             className='w-full mt-2 p-2 max-w-lg rounded border border-gray-300 outline-none '
//             required
//           />

//         <p className='mt-4'>
//           Sub Title </p>
//           <input 
//             type="text" 
//             placeholder='Type here...' 
//             requried
//             onChange={(e)=>setSubtitle(e.target.value)} 
//             value={subtitle}
//             className='w-full mt-2 p-2 max-w-lg rounded border border-gray-300 outline-none '
//             required
//           />

//           <p className='mt-4'>Blog Description</p>
//           <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
//             <div ref={editorRef}></div>
//             <button type="button" onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>
//             Generate with AI</button>
//           </div>
        
//           <p className='mt-4'>Blog Category</p>
//           <select 
//             value={category}
//             onChange={(e)=>setCategory(e.target.value)}
//             className='mt-2 py-2 px-3 rounded border border-gray-300 text-gray-500 outline-none '
//           >
//             <option value="">Select a category</option>  
//             {blogCategories.map((item, index)=>{
//                   return <option key={index} value={item}>{item}</option>
//             })}
            
//           </select>

//           <div className='mt-6 flex gap-4'>
//             <p>Publish now</p>
//             <input type="checkbox" onChange={(e)=>setIsPublished(e.target.checked)} checked={isPublished} className='scale-125 cursor-pointer' />
//           </div>

//           <button disabled={isAdding} type="submit" className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
//             {isAdding ? 'Adding...' : 'Add Blog'}
//           </button>
//       </div>

//     </form>

//   )
// }

// export default Addblog
import React, { useEffect, useRef, useState } from 'react';
import { blogCategories, assets } from '../../assets/assets';
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import {marked} from 'marked';

const Addblog = () => {
  const { axios } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if(!title){
      return toast.error('Please enter the title to generate content');
    }
    try{
      setLoading(true); 
      const { data } = await axios.post('/api/blog/generate', {
        prompt: title
      });
      if(data.success){
        quillRef.current.root.innerHTML=marked.parse(data.content);
        // toast.success('Content generated successfully');
      }else{
        toast.error(data.message);
      }
    }catch(error){
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsAdding(true);

      const blog = {
        title,
        subtitle,
        description: quillRef.current?.root?.innerHTML || '',
        category,
        isPublished,
      };

      const formData = new FormData();

      formData.append('blog', JSON.stringify(blog));

      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post('/api/blog/add', formData);

      if (data.success) {
        toast.success(data.message);

        setImage(null);
        setTitle('');
        setSubtitle('');
        setCategory('');
        setIsPublished(false);

        if (quillRef.current) {
          quillRef.current.root.innerHTML = '';
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || error.message || 'Something went wrong'
      );
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 text-gray-600 h-full overflow-scroll bg-blue-50/50"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>

        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload}
            alt="Upload"
            className="mt-2 h-16 rounded cursor-pointer"
          />

          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <p className="mt-4">Blog Title</p>

        <input
          type="text"
          placeholder="Type here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-2 p-2 max-w-lg rounded border border-gray-300 outline-none"
          required
        />

        <p className="mt-4">Sub Title</p>

        <input
          type="text"
          placeholder="Type here..."
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full mt-2 p-2 max-w-lg rounded border border-gray-300 outline-none"
          required
        />

        <p className="mt-4">Blog Description</p>

        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          {loading && (
            <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2"> 
              <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>
          </div>)}
          <button
            disabled={loading} 
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>

        <p className="mt-4">Blog Category</p>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 py-2 px-3 rounded border border-gray-300 text-gray-500 outline-none"
          required
        >
          <option value="">Select a category</option>

          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="mt-6 flex gap-4">
          <p>Publish now</p>

          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 cursor-pointer"
          />
        </div>

        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm disabled:opacity-50"
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  );
};

export default Addblog;