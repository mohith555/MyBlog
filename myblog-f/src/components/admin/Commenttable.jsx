import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

// const Commenttable = ({comment,fetchComments}) => {

//     const {blog,createdAt,_id}=comment; 
//     const BlogDate =new Date(createdAt);

//   return (
//     <tr className='border-y border-gray-700'>
//         <td className='px-6 py-4'>
//             <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
//             <br/>
//             <br />
//             <b className='font-medium text-gray-600'>Name</b> : {comment.name}
//             <br />
//             <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
//         </td>
//         <td className='px-6 py-4 max-sm:hidden'>
//             {BlogDate.toLocaleDateString()}
//         </td>
//         <td className='px-6 py-4'>
//             <div className='inline-flex items-center gap-4'>
//                 {!comment.isApproved ? <img src={assets.tick} alt="Approve" className='w-5 hover:scale-110 transition-all cursor-pointer'/> 
//                 : <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>}

//                 <img src={assets.dustbin} alt="Delete" className='w-5 hover:scale-110 transition-all cursor-pointer'/>
//             </div>
//         </td>
//     </tr>
//   )
// }

const Commenttable = ({ comment , fetchComments }) => {
  const blogTitle = comment.blog?.title || 'N/A';
  const date = comment.createdAt ? new Date(comment.createdAt) : null;
  const isApproved = comment.isApproved === true;

  const { axios } = useAppContext();
  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: comment._id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    }catch (error) {
      toast.error('Failed to approve comment');
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this comment?');
      if (!confirm) return;
      const { data } = await axios.post('/api/admin/delete-comment', { id: comment._id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    }catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  return (
    <tr className='border-y border-gray-700'>
      <td className='px-6 py-4'>
        <b className='font-medium text-gray-600'>Blog</b> : {blogTitle}
        <br /><br />
        <b className='font-medium text-gray-600'>Name</b> : {comment.name}
        <br />
        <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
      </td>

      <td className='px-6 py-4 max-sm:hidden'>
        {date ? date.toLocaleDateString() : '—'}
      </td>

      <td className='px-6 py-4'>
        <div className='inline-flex items-center gap-4'>
          {!isApproved ? (
            <img onClick={approveComment} src={assets.tick} alt="Approve" className='w-5 cursor-pointer' />
          ) : (
            <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
              Approved
            </p>
          )}
          <img onClick={deleteComment} src={assets.dustbin} alt="Delete" className='w-5 cursor-pointer' />
        </div>
      </td>
    </tr>
  );
};
export default Commenttable