function LabeledInput({label, name, type = "text", pattern = undefined}) {
  const id = `input-${name}-${label}`.replaceAll(" ", "-")
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} pattern={pattern}/>
    </>
  )
}

export default LabeledInput
