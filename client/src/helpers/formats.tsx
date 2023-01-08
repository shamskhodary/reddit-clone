export const modules = {
  toolbar: [
    // [{ 'font': [] }],
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ['clean'],
  ],
}

export const formats = [
  // 'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'color',
  'background',
]
