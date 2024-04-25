import { Button } from "flowbite-react";
import { FaLink } from "react-icons/fa";
export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to know more about Movies???</h2>
        <p className="text-gray-500 my-2">Checkout Letterboxd</p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://www.letterboxd.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2"
          >
            <FaLink />
            <span>Letterboxd</span>
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://i.pcmag.com/imagery/reviews/00KJnr1PjsOm1Wmx4jxKgBt-1.fit_lim.size_1050x591.v1686067472.png" />
      </div>
    </div>
  );
}
