const Footer =() =>{

  return(

 
 <footer className="relative">
 {/* 럭셔리한 패턴 배경 */}
 <div className="absolute inset-0 opacity-10">
   <div className="w-full h-full" style={{
     backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
     backgroundSize: '40px 40px'
   }}/>
 </div>
 <div className="container mx-auto px-4 relative">
{/*} <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
     <div>
         <h4 className="text-lg font-semibold mb-4">고객센터</h4>
         <p>평일 09:00 - 18:00</p>
         <p>주말 및 공휴일 휴무</p>
         <p className="text-xl font-semibold mt-2">1588-0000</p>
     </div>
     <div>
         <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
         <ul className="space-y-2">
             <li><a href="#" className="hover:text-rose-200">회사소개</a></li>
             <li><a href="#" className="hover:text-rose-200">이용약관</a></li>
             <li><a href="#" className="hover:text-rose-200">개인정보처리방침</a></li>
         </ul>
     </div>
     <div>
         <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
         <div className="flex space-x-4">
             <a href="#" className="hover:text-rose-200">Instagram</a>
             <a href="#" className="hover:text-rose-200">Facebook</a>
             <a href="#" className="hover:text-rose-200">YouTube</a>
         </div>
     </div>
 </div>
 {*/}
 <div className="mt-8   border-t border-rose-100 pt-4 pb-4 text-sm text-rose-700">
     <p><strong>Company Name:</strong> ABC Lingerie Co., Ltd.</p>
     <p><strong>Address:</strong> 123 Fashion St., Seoul, South Korea</p>
     <p><strong>Main Number:</strong> +82-2-1588-0000</p>
     <p><strong>Fax:</strong> +82-2-1588-1234</p>
     <p><strong>Email:</strong> contact@abclingerie.co.kr</p>
     <p><strong>Business Registration Number:</strong> 123-45-67890</p>
 </div>
</div>
</footer>

  );
};

export default Footer;