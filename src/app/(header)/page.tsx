const HeaderLayoutPage = () => {
  return (
    <main className="fixed py-6 z-50 w-full flex justify-between px-4">
      <div className="p-4">오늘의 날씨:</div>
      <div className="p-4 flex space-x-4">
        <div>log-in</div>
        <div>log-out</div>
        <div>sign-up</div>
      </div>
    </main>
  );
};

export default HeaderLayoutPage;
