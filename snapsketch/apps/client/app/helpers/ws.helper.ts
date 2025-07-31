type Shapes =
  | {
      type: "Rectangle";
      width: number;
      height: number;
      x: number;
      y: number;
    }
  | {
      type: "Circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export const creatRectangle = (
  socket: WebSocket | null,
  roomID: string,
  startX: number,
  startY: number,
  width: number,
  height: number
) => {
  const payload = {
    type: "create",
    roomID: roomID,
    message: {
      type: "Rectangle",
      x: startX,
      y: startY,
      width: width,
      height: height,
    },
  };

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    alert("Socket not open, message not sent");
    return;
  }

  socket.send(JSON.stringify(payload));
};

export const creatCircle = (
  socket: WebSocket | null,
  roomID: string,
  startX: number,
  startY: number,
  radius: number
) => {
  const payload = {
    type: "create",
    roomID: roomID,
    message: {
      type: "Circle",
      x: startX,
      y: startY,
      radius: radius,
    },
  };

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    alert("Socket not open, message not sent");
    return;
  }

  socket.send(JSON.stringify(payload));
};

export const convertServerShapeToClient = (shape: Shapes): Shapes => {
  if (shape.type === "Rectangle") {
    return {
      type: "Rectangle",
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
    };
  } else {
    return {
      type: "Circle",
      centerX: shape.centerX,
      centerY: shape.centerY,
      radius: shape.radius,
    };
  }
};
