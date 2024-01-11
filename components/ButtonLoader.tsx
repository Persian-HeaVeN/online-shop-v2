
export default function ButtonLoader(params: any) {
  return (
    <div className={`${params.show === false && "hidden"} flex`}>
        <span className="btn-loader"></span>
    </div>
  )
}
