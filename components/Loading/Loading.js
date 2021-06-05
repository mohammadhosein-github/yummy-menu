export default function Loading() {
  return (
    <div className="loading w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="text-uppercase text-weight-bold">
        loading
        <div className="dots d-inline-block">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
