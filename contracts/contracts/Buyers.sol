//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract Buyers {
    uint256 public orderId;

    struct Buyer {
        string name;
        string deliveryAdd;
        address payable buyerAddress;
    }

    struct Order {
        uint256 ordId;
        uint256 pid;
        uint256 qnt;
        uint256 amt;
        address payable sellerAddress;
        bool paymentStatus;
        string orderStatus;
        string pmtId;
        address buyerAdd;
    }

    Buyer[] public buyers;

    mapping(address => Order[]) public orderList;

    event BuyerAdded(string name, string deliveryAdd, address buyerAddress);

    event ProductBought(
        uint256 oId,
        uint256 pid,
        uint256 qnt,
        uint256 amt,
        address buyerAddress
    );

    function _isOldBuyer() public view returns (bool) {
        for (uint256 i = 0; i < buyers.length; i++) {
            if (msg.sender == buyers[i].buyerAddress) return true;
        }
        return false;
    }

    modifier onlyNewBuyer() {
        require(!_isOldBuyer());
        _;
    }

    modifier onlyBuyer() {
        require(_isOldBuyer());
        _;
    }

    function addBuyer(string memory _name, string memory _deliveryAdd)
        public
        onlyNewBuyer
    {
        buyers.push(Buyer(_name, _deliveryAdd, payable(msg.sender)));
        emit BuyerAdded(_name, _deliveryAdd, msg.sender);
    }

    function getBuyerInfo(address _buyerAddress)
        public
        view
        returns (Buyer memory)
    {
        for (uint256 i = 0; i < buyers.length; i++) {
            if (_buyerAddress == buyers[i].buyerAddress) {
                return buyers[i];
            }
        }
    }

    function addOrder(
        uint256 _pid,
        uint256 _qnt,
        uint256 _amt,
        address payable sellerAdd,
        string memory _orderStatus,
        string memory _pmtId
    ) internal {
        orderId++;
        orderList[msg.sender].push(
            Order(
                orderId,
                _pid,
                _qnt,
                _amt,
                sellerAdd,
                false,
                _orderStatus,
                _pmtId,
                msg.sender
            )
        );
        emit ProductBought(orderId, _pid, _qnt, _amt, msg.sender);
    }

    function getBuyerOrders() public view returns (Order[] memory) {
        return orderList[msg.sender];
    }

    function getOrderById(uint256 _oId) public view returns (Order memory) {
        for (uint256 j = 0; j < buyers.length; j++) {
            address buyerAdd = buyers[j].buyerAddress;
            Order[] memory orders = orderList[buyerAdd];
            for (uint256 i = 0; i < orders.length; i++) {
                if (orders[i].ordId == _oId) {
                    return orders[i];
                }
            }
        }

        Order memory nullOrder = Order(
            0,
            0,
            0,
            0,
            payable(address(0x0)),
            false,
            "",
            "",
            address(0x0)
        );
        return nullOrder;
    }

    function confirmOrder(uint256 _oId) public {
        Order[] storage orders = orderList[msg.sender];
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].ordId == _oId) {
                orders[i].paymentStatus = true;
                orders[i].orderStatus = "delivered";
                break;
            }
        }
    }

    function getPendingOrderAmt(uint256 _oId) public view returns (uint256) {
        Order memory order = getOrderById(_oId);
        return order.amt;
    }

    function getOrderSellerAddress(uint256 _oId)
        public
        view
        returns (address payable)
    {
        Order memory order = getOrderById(_oId);
        return order.sellerAddress;
    }
}
