package com.society.management.service;

import com.society.management.entity.*;
import com.society.management.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseCategoryRepository expenseCategoryRepository;

    @Autowired
    private ComplaintCategoryRepository complaintCategoryRepository;

    @Autowired
    private FlatRepository flatRepository;

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    @Autowired
    private AmenityRepository amenityRepository;

    @Autowired
    private ResidentRepository residentRepository;

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private BillingService billingService;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.existsByUsername("admin")) {
            System.out.println("✓ Database already initialized.");
            return;
        }

        System.out.println("============================================================");
        System.out.println("Society Management System - Java Seeding Data");
        System.out.println("============================================================");

        // 1. Superuser / Admin
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@society.com");
        admin.setPassword("admin123");
        admin.setFirstName("System");
        admin.setLastName("Administrator");
        admin.setRole("admin");
        admin.setPhone("1234567890");
        admin = userRepository.save(admin);
        System.out.println("✓ Superuser created (username: admin, password: admin123)");

        // 2. Expense categories
        List<String> expenseCategories = Arrays.asList(
            "Electricity", "Water Supply", "Security Services",
            "Gardening", "Housekeeping", "Repairs & Maintenance",
            "Lift Maintenance", "Insurance", "Legal Fees", "Miscellaneous"
        );
        for (String cat : expenseCategories) {
            ExpenseCategory ec = new ExpenseCategory();
            ec.setName(cat);
            ec.setDescription(cat + " expenses for society maintenance");
            expenseCategoryRepository.save(ec);
        }
        System.out.println("✓ Created " + expenseCategories.size() + " expense categories");

        // 3. Complaint categories
        List<List<String>> complaintCategories = Arrays.asList(
            Arrays.asList("Water Supply", "fas fa-tint"),
            Arrays.asList("Electricity", "fas fa-bolt"),
            Arrays.asList("Security", "fas fa-shield-alt"),
            Arrays.asList("Cleaning", "fas fa-broom"),
            Arrays.asList("Plumbing", "fas fa-wrench"),
            Arrays.asList("Lift", "fas fa-elevator"),
            Arrays.asList("Parking", "fas fa-parking"),
            Arrays.asList("Noise", "fas fa-volume-up"),
            Arrays.asList("Common Area", "fas fa-building"),
            Arrays.asList("Other", "fas fa-question-circle")
        );
        for (List<String> cat : complaintCategories) {
            ComplaintCategory cc = new ComplaintCategory();
            cc.setName(cat.get(0));
            cc.setIcon(cat.get(1));
            cc.setDescription("Complaints related to " + cat.get(0));
            complaintCategoryRepository.save(cc);
        }
        System.out.println("✓ Created " + complaintCategories.size() + " complaint categories");

        // 4. Flats
        int flatCount = 0;
        for (int floor = 1; floor <= 5; floor++) {
            for (int flatNum = 1; flatNum <= 4; flatNum++) {
                String flatNumber = String.format("%d%02d", floor, flatNum);
                
                String flatType = Arrays.asList("1BHK", "2BHK", "3BHK", "2BHK").get(flatNum - 1);
                double carpetArea = Arrays.asList(650.0, 950.0, 1200.0, 900.0).get(flatNum - 1);
                BigDecimal maintenance = Arrays.asList(new BigDecimal("3000.00"), new BigDecimal("4500.00"), new BigDecimal("6000.00"), new BigDecimal("4200.00")).get(flatNum - 1);
                String occupancy = (flatNum <= 3) ? "occupied" : "vacant";

                Flat flat = new Flat();
                flat.setFlatNumber(flatNumber);
                flat.setFloor(floor);
                flat.setBlock("A");
                flat.setFlatType(flatType);
                flat.setCarpetArea(carpetArea);
                flat.setMonthlyMaintenance(maintenance);
                flat.setOccupancyStatus(occupancy);
                flatRepository.save(flat);
                flatCount++;
            }
        }
        System.out.println("✓ Created " + flatCount + " flats");

        // 5. Parking Slots
        int slotCount = 0;
        // Two-wheeler slots
        for (int i = 1; i <= 30; i++) {
            ParkingSlot ps = new ParkingSlot();
            ps.setSlotNumber(String.format("2W-%02d", i));
            ps.setSlotType("two_wheeler");
            ps.setFloor(-1);
            ps.setZone(i <= 15 ? "A" : "B");
            ps.setMonthlyCharge(new BigDecimal("300.00"));
            parkingSlotRepository.save(ps);
            slotCount++;
        }
        // Four-wheeler slots
        for (int i = 1; i <= 20; i++) {
            ParkingSlot ps = new ParkingSlot();
            ps.setSlotNumber(String.format("4W-%02d", i));
            ps.setSlotType("four_wheeler");
            ps.setFloor(-1);
            ps.setZone(i <= 10 ? "A" : "B");
            ps.setMonthlyCharge(new BigDecimal("1000.00"));
            parkingSlotRepository.save(ps);
            slotCount++;
        }
        System.out.println("✓ Created " + slotCount + " parking slots");

        // 6. Amenities
        List<List<Object>> amenities = Arrays.asList(
            Arrays.asList("Clubhouse", "clubhouse", 50, new BigDecimal("2000.00"), LocalTime.of(8, 0), LocalTime.of(22, 0)),
            Arrays.asList("Gym", "gym", 20, BigDecimal.ZERO, LocalTime.of(6, 0), LocalTime.of(22, 0)),
            Arrays.asList("Swimming Pool", "pool", 30, BigDecimal.ZERO, LocalTime.of(6, 0), LocalTime.of(20, 0)),
            Arrays.asList("Community Hall", "hall", 100, new BigDecimal("5000.00"), LocalTime.of(9, 0), LocalTime.of(23, 0)),
            Arrays.asList("Sports Court", "sports", 20, new BigDecimal("500.00"), LocalTime.of(6, 0), LocalTime.of(21, 0))
        );
        for (List<Object> am : amenities) {
            Amenity a = new Amenity();
            a.setName((String) am.get(0));
            a.setAmenityType((String) am.get(1));
            a.setCapacity((Integer) am.get(2));
            a.setBookingCharge((BigDecimal) am.get(3));
            a.setAvailableFrom((LocalTime) am.get(4));
            a.setAvailableTo((LocalTime) am.get(5));
            a.setDescription(am.get(0) + " - Available for booking by residents");
            amenityRepository.save(a);
        }
        System.out.println("✓ Created " + amenities.size() + " amenities");

        // 7. Users and Residents
        // Secretary
        User secUser = new User();
        secUser.setUsername("secretary");
        secUser.setEmail("secretary@society.com");
        secUser.setPassword("secretary123");
        secUser.setFirstName("John");
        secUser.setLastName("Smith");
        secUser.setRole("secretary");
        secUser.setPhone("9876543210");
        userRepository.save(secUser);
        System.out.println("✓ Created secretary user (username: secretary, password: secretary123)");

        // Treasurer
        User tresUser = new User();
        tresUser.setUsername("treasurer");
        tresUser.setEmail("treasurer@society.com");
        tresUser.setPassword("treasurer123");
        tresUser.setFirstName("Sarah");
        tresUser.setLastName("Johnson");
        tresUser.setRole("treasurer");
        tresUser.setPhone("9876543211");
        userRepository.save(tresUser);
        System.out.println("✓ Created treasurer user (username: treasurer, password: treasurer123)");

        // Sample Residents
        List<List<String>> sampleResidents = Arrays.asList(
            Arrays.asList("resident1", "Rajesh", "Kumar", "101"),
            Arrays.asList("resident2", "Priya", "Sharma", "102"),
            Arrays.asList("resident3", "Amit", "Patel", "103")
        );
        for (List<String> res : sampleResidents) {
            User rUser = new User();
            rUser.setUsername(res.get(0));
            rUser.setEmail(res.get(0) + "@example.com");
            rUser.setPassword("resident123");
            rUser.setFirstName(res.get(1));
            rUser.setLastName(res.get(2));
            rUser.setRole("resident");
            rUser.setPhone("98765432" + res.get(3));
            rUser.setFlatNumber(res.get(3));
            rUser = userRepository.save(rUser);

            Flat flat = flatRepository.findByFlatNumber(res.get(3)).orElse(null);
            Resident resident = new Resident();
            resident.setUser(rUser);
            resident.setFlat(flat);
            resident.setResidentType("owner");
            resident.setMoveInDate(LocalDate.now().minusDays(365));
            resident.setEmergencyContactName("Emergency Contact");
            resident.setEmergencyContactPhone("9999999999");
            resident.setEmergencyContactRelation("Family");
            residentRepository.save(resident);
            System.out.println("✓ Created resident " + res.get(0) + " (password: resident123) in flat " + res.get(3));
        }

        // 8. Notice
        Notice welcomeNotice = new Notice();
        welcomeNotice.setTitle("Welcome to Society Management System");
        welcomeNotice.setNoticeType("general");
        welcomeNotice.setPriority("high");
        welcomeNotice.setContent("Welcome to our new digital society management system. You can now pay bills, file complaints, and stay updated with society activities online. For any queries, please contact the admin.");
        welcomeNotice.setPublishedBy(admin);
        welcomeNotice.setIsPinned(true);
        welcomeNotice.setShowOnHomepage(true);
        noticeRepository.save(welcomeNotice);
        System.out.println("✓ Created welcome notice");

        // 9. Initial Bills for current month
        billingService.generateBillsForMonth(LocalDate.now());
        System.out.println("✓ Auto-generated initial bills for current month");

        System.out.println("============================================================");
    }
}
