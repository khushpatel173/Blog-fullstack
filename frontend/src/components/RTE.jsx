// api - u3j9w7dwrh04rhlrwsr37ydz9g70ascfb3kbfi913r8vm15x

import React from 'react'
import { Controller } from 'react-hook-form'
import {Editor} from '@tinymce/tinymce-react'

function RTE({label , control , name , defaultValue=''}) {
  return (
  <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
    // just to have the editor is simple but we also need its context in order to add and all
      <Controller
      control={control}
      name={name || 'content'}
      render={({field})=>(
        <Editor
        apiKey='u3j9w7dwrh04rhlrwsr37ydz9g70ascfb3kbfi913r8vm15x'
          initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={field.onChange}
        />
      )}
      />
</div>
  )
}

export default RTE