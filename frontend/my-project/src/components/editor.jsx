import React from "react";

export const Editor = () => {

  const editorArray = [
    {
      imgSrc: "/assets/Rectangle1.png",
      tag: "MINIMALISM",
      title: "Culpa sit Laboris Exercitation ea Fugiat",
      author: "Leslie Pena",
      date: "April 25, 2012 (6 mins read)",
      description:
        "Incididunt occaecat et qui dolore consectetur magna. Lorem veniam ut et labore consequat ut ex sunt. Ut et nostrud aliquip do anim proident ad nulla consectetur eu aute ex anim mollit. Anim aute exercitation nisi fugiat. Dolor velit excepteur commodo proident nulla commodo ullamco labore et esse.",
    },
    {
      imgSrc: "/assets/Rectangle2.png",
      tag: "TECHNOLOGY",
      title: "Amet non Ex Officia nulla Cupidatat",
      author: "Jacob Henry",
      date: "September 27, 2017 (8 mins read)",
      description:
        "Sint anim Lorem aute duis Lorem incididunt. Nulla nostrud irure id ipsum aute excepteur duis sint. Do occaecat sit dolor magna esse. Mollit incididunt cillum consectetur fugiat adipisicing dolor est id minim amet cillum esse Lorem. Deserunt non duis excepteur aliqua duis eu reprehenderit.w",
    },
    {
      imgSrc: "/assets/Rectangle3.png",
      tag: "ARTICLE",
      title: "Dolor ex Tempor Cotur Culpa li",
      author: "Darrell Lane",
      date: "May 16, 2017 (3 mins read)",
      description:
        "Incididunt sint nulla eu adipisicing eu reprehenderit proident consequat est. Nisi consectetur incididunt mollit officia ut cupidatat laborum proident eu velit Lorem deserunt deserunt voluptate. Proident nostrud laborum reprehenderit culpa irure id labore do ad do minim nisi. Incididunt ex.",
    },
  ];

  const editorArray2 = [
    {
      imgSrc: "/assets/Rectangle4.png",
      tag: "NATURE",
      title: "Tempor deserunt Sunt Qui",
      author: "Connie Robertson",
      date: "November 3, 2012",
      description:
        "Ea qui dolor aute cupidatat ad pariatur proident. Mollit nulla tempor aute reprehenderit ut dolore mollit nisi consequat excepteur ex officia pariatur irure.",
    },
    {
      imgSrc: "/assets/Rectangle5.png",
      tag: "PLANTS",
      title: "Occaecat Anim eu Qui",
      author: "Eleanor Williamson",
      date: "September 28, 2014",
      description:
        "Qui ipsum consectetur ad incididunt et aliquip exercitation laboris nisi reprehenderit. Et excepteur commodo esse enim ea aliqua officia reprehenderit.",
    },
    {
      imgSrc: "/assets/Rectangle6.png",
      tag: "FOOD",
      title: "Fugiat Incididunt Voluptate Consequat",
      author: "Bessie Watson",
      date: "June 13, 2012",
      description: "Mollit ea culpa ipsum pariatur eiusmod. Irure et.",
    },
    {
      imgSrc: "/assets/Rectangle7.png",
      tag: "COLORFUL",
      title: "Occaecat Anim eu Qui",
      author: "Ted Simmmons",
      date: "June 21, 2015",
      description:
        "Amet ipsum occaecat aliqua aute nisi laboris nostrud culpa est do. Aliqua esse velit in excepteur esse qui voluptate laboris adipisicing qui irure elit amet excepteur.",
    },
  ];
  return (
    <>
      <div className="pt-16">
        <div className="flex items-center gap-y-4 flex-col relative">
          <h1 className="font-sans  text-5xl text-center font-bold">
            Editor's Picks
          </h1>
          <img src="/assets/Line.png" className="rounded-full " alt="" />
        </div>

        {editorArray.map((item) => {
          return (
            <>
              <div className="flex items-center justify-center px-72 py-16 gap-10">
                <div>
                  <img src={item.imgSrc} alt="" />
                </div>

                <div className="w-3/5">
                  <h2 className="text-xl text-lightGray lead  font-sans">
                    {item.tag}
                  </h2>
                  <h1 className="text-3xl font-serif font-bold pb-2">
                    {item.title}
                  </h1>

                  <div className="flex gap-4 items-center pb-2">
                    <p className="text-base text-lightGray font-sans font-normal">
                      {item.author}
                    </p>
                    <img src="/assets/Ellipse1.png" alt="" />
                    <p className="text-base font-sans text-lightGray">
                      {item.date}
                    </p>
                  </div>

                  <p className="text-base font-sans font-normal text-[#000]">
                    {item.description}
                  </p>
                </div>
              </div>
            </>
          );
        })}

        <div className="relative px-4">
          <div className="absolute w-[38rem] bg-white right-16 py-20 px-16 z-10">
            <h2 className="text-xl font-sans pb-2 text-lightGray">INTERIOR</h2>
            <h1 className="font-serif text-4xl pb-2 font-bold leading-tight">
              Laborum Ullamco Sunt id ut Sunt
            </h1>
            <div className="flex gap-4 items-center pb-2 font-sans">
              <p className="text-base text-lightGray font-normal">
                Bessie Hawkins
              </p>
              <img src="/assets/Ellipse1.png" alt="" />
              <p className="text-base text-lightGray">
                May 7, 2019 (10 mins read)
              </p>
            </div>
            <p className="text-base font-normal text-[#000]">
              Proident aliquip velit qui commodo officia qui consectetur dolor
              ullamco aliquip elit incididunt. Ea minim ex consectetur
              excepteur. Ex laborum nostrud mollit sint consectetur Lorem amet
              aliqua do enim. Commodo duis dolor anim excepteur. In aliquip
              mollit nulla consequat velit magna.
            </p>
          </div>

          <img src="/assets/articleImage.png" alt="" className="absolute" />
        </div>

        {editorArray2.map((item) => {
          return (
            <>
              <div className="flex relative items-center justify-center px-48 py-16 gap-10 top-[40rem] ">
                <div>
                  <img src={item.imgSrc} alt="" />
                </div>

                <div className="w-full">
                  <h2 className="text-xl text-lightGray lead  font-sans">
                    {item.tag}
                  </h2>
                  <h1 className="text-3xl font-serif font-bold pb-2">
                    {item.title}
                  </h1>

                  <div className="flex gap-4 items-center pb-2">
                    <p className="text-base text-lightGray font-sans font-normal">
                      {item.author}
                    </p>
                    <img src="/assets/Ellipse1.png" alt="" />
                    <p className="text-base font-sans text-lightGray">
                      {item.date}
                    </p>
                  </div>

                  <p className="text-base font-sans font-normal text-[#000]">
                    {item.description}
                  </p>
                </div>
              </div>

              <div></div>
            </>
          );
        })}
      </div>
    </>
  );
};
