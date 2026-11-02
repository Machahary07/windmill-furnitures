/* Shown inside the admin shell while the next screen renders on the server */
export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="animate-pulse">
      <div className="h-8 w-48 rounded-lg bg-[#ececea]" />
      <div className="mt-3 h-4 w-80 max-w-full rounded bg-[#f0f0ee]" />
      <div className="mt-8 h-[360px] rounded-xl border border-[#ececec] bg-white" />
    </div>
  );
}
