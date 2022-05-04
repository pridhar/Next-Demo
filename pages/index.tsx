import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from "next/head";
import $ from 'jquery'; 
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { prisma } from '../lib/prisma'
import bg from '../public/Solid-Color-Backgrounds.jpg'



interface FormData {
  title: string
  content: string
  id: string
}

const Home = () => {
  //const [form, setForm] = useState<FormData>({title: '', content: '', id: ''})
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  //const router = useRouter()
  //const refreshData = () => {
   // router.replace(router.asPath)
  //}
  
  async function onSubmitForm(data: FormData) {
    try {
       fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(response => response.json())
    .then(data => {
      $('#show').html(data.message)
      reset();
    })
  } catch (error) {
      console.log(error);
    }
  }

 
  return (
    <div style={{
      backgroundImage: `url(${bg.src})`,
      width: '100%',
      height: '700px',
    }}>
    <Head>
    <title>Bootstrap 4 Example</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"></link>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
    </Head>
    <br></br><br></br>
    <div className="container-fluid">
    <div className="row"><div className="col-md-4"></div>
    <div className="col-md-4">
    <form  onSubmit={handleSubmit(onSubmitForm)} >
      <div className="form-group">
      <input
              type="text"
              {...register('title', { required: {
                value: true,
                message: 'You must enter title',
              }, })}
              className={`form-control ${
                errors.title ? 'form-control is-invalid' : null
              }`}
              placeholder="Full name"
            />
           <div className="invalid-feedback">{errors?.title?.message}</div>
            </div>
      <div className="form-group">
      <input
              type="text"
              {...register('content', { required: {
                value: true,
                message: 'You must enter content',
              },})}
              className={`form-control ${
                errors.content ? 'form-control is-invalid' : null
              }`}
              placeholder="content"
            />
            <div className="invalid-feedback">{errors?.content?.message}</div>
            
        </div>
      <button className="btn btn-primary" type="submit">Add</button>
      <br></br>
      <h3 id='show' style={{color: 'white'}}></h3>
       
      </form>
      </div>
      </div>
      </div>
      </div>
  )
}


export default Home

