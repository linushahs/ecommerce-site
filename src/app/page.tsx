import Button from "@/components/common/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full mb-8">
      <div className="container flex justify-between w-full mt-[calc(var(--navbar-height))] bg-slate-50 rounded-lg overflow-hidden">
        <div className="flex items-start flex-col justify-center p-14 ">
          <h1 className=" text-7xl mb-4 w-[80%]">
            <strong>See</strong>
            &nbsp;everything with&nbsp;
            <strong>Clarity</strong>
          </h1>
          <p>
            Buying eyewear should leave you happy and good-looking, with money
            in your pocket. Glasses, sunglasses, and contacts—we’ve got your
            eyes covered.
          </p>
          <br />
          <Link href="/shop">
            <Button>
              Shop Now
              <ArrowRightIcon className="w-5" />
            </Button>
          </Link>
        </div>
        <div className="relative w-full min-h-full">
          <Image
            src={"/images/banner-girl.png"}
            alt="banner girl"
            width={400}
            height={300}
            className="w-full h-full object-cover translate-x-14"
          />
        </div>
      </div>

      {/* Featured products ---------------------  */}
      {/* ---------------------------------------- */}
    </main>
  );
}
