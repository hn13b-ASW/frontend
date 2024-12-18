import React from "react";
import VoteButton from "./VoteButton";

//Funció per mostrar submisions
function StoryList() {
  const stories = [
    {
      id: "42413757",
      rank: 1,
      title: "macOS 15.2 breaks the ability to copy the OS to another drive",
      url: "https://www.shirtpocket.com/blog/index.php/shadedgrey/youre_a_mean_one/",
      site: "shirtpocket.com",
      points: 285,
      author: "zdw",
      age: "7 hours ago",
      comments: 161,
    },
    {
      id: "42412360",
      rank: 2,
      title: "Sharing new research, models, and datasets from Meta FAIR",
      url: "https://ai.meta.com/blog/meta-fair-updates-agents-robustness-safety-architecture/?_fb_noscript=1",
      site: "meta.com",
      points: 229,
      author: "ilaksh",
      age: "11 hours ago",
      comments: 37,
    },
    {
      id: "42413343",
      rank: 3,
      title: "Luon programming language",
      url: "https://github.com/rochus-keller/Luon/blob/master/Readme.md",
      site: "github.com/rochus-keller",
      points: 120,
      author: "thunderbong",
      age: "8 hours ago",
      comments: 45,
    },
    {
      id: "42403273",
      rank: 4,
      title: "Energy-Harvesting Electronic Holiday Card 2024",
      url: "https://www.keacher.com/xmas24/",
      site: "keacher.com",
      points: 56,
      author: "teuobk",
      age: "6 hours ago",
      comments: 5,
    },
    {
      id: "42413464",
      rank: 5,
      title:
        "Show HN: Performant intracontinental public transport routing in Rust",
      url: "https://github.com/ellenhp/farebox",
      site: "github.com/ellenhp",
      points: 63,
      author: "ellenhp",
      age: "8 hours ago",
      comments: 9,
    },
  ];

  return (
    <table style={{ backgroundColor: "#f6f6ef", width: "100%" }}>
      <tbody>
        {stories.map((story) => (
          <React.Fragment key={story.id}>
            <tr className="athing">
              {/* Número de clasificación */}
              <td align="right" className="title" style={{ paddingRight: "5px" }}>
                <span className="rank">{story.rank}.</span>
              </td>
              {/* Flecha de votación */}
              <td className="votelinks">
                <VoteButton id={story.id} />
              </td>
              {/* Título de la historia */}
              <td className="title">
                <a href={story.url} className="titleline" style={{ color: "#000" }}>
                  {story.title}
                </a>{" "}
                <span className="sitebit comhead" style={{ color: "#828282" }}>
                  ({story.site})
                </span>
              </td>
            </tr>
            {/* Subtexto con puntos, autor, edad, hide y número de comentarios */}
            <tr>
              <td colSpan="2"></td>
              <td className="subtext" style={{ fontSize: "7pt", color: "#828282" }}>
                {story.points} points by{" "}
                <a href="#" className="hnuser" style={{ color: "#828282" }}>
                  {story.author}
                </a>{" "}
                <span className="age">{story.age}</span> |{" "}
                <a href="#" style={{ color: "#828282" }}>
                  hide
                </a>{" "}
                |{" "}
                <a
                  href="#"
                  style={{ color: "#828282", textDecoration: "underline" }}
                >
                  {story.comments} comments
                </a>
              </td>
            </tr>
            <tr className="spacer" style={{ height: "5px" }}></tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default StoryList;
