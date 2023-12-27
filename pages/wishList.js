import React from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import { useSelector } from "react-redux";
import WishlistItem from "@/components/WishlistItem";

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishList.wishListItems);

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {wishlistItems?.length > 0 ? (
          <>
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Wishlist Cart
              </div>
            </div>
            <div className="flex flex-col gap-12 py-10">
              <div className="text-lg font-bold">Wishlist Items</div>
              {wishlistItems.map((item) => (
                <WishlistItem key={item.id} data={item} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/empty-cart.jpg"
              alt="empty-wishlist"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">Your wishlist is empty</span>
            <span className="text-center mt-4">
              Looks like you haven't added anything to your wishlist.
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default WishlistPage;
